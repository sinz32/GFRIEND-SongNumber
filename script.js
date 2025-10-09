(async function() {
    var src = '';

    const ko = await fetch('./music/ko.csv?ts=' + Date.now()).then((res) => res.text());
    var head = '<tr class="head"><td>제목</td><td>금영</td><td>태진</td><td>JOYSOUND</td></tr>';
    ko.trim().split('\n').forEach((e, i) => {
        if (e.trim() == '') return;
        if (e.includes(',,')) {
            e = e.split(',,');
            src += '<tr><td>' + e[0] + '</td><td>' + e[1] + '</td><td>' + e[2] + '</td><td>' + e[3] + '</td></tr>';
        } else {
            if (i > 0) src += '</table>';
            src += '<table>';
            src += '<tr><th colspan="4">' + e + '</th></tr>' + head;
        }
    });
    src += '</table>';

    const ja = await fetch('./music/ja.csv').then((res) => res.text());
    src += '<table>';
    var head = '<tr class="head"><td>제목</td><td>JOYSOUND</td><td>e-bo</td></tr>';
    ja.trim().split('\n').forEach((e, i) => {
        if (e.trim() == '') return;
        if (e.includes(',,')) {
            e = e.split(',,');
            src += '<tr><td>' + e[0] + '</td><td>' + e[1] + '</td><td>' + e[2] + '</td></tr>';
        } else {
            if (i > 0) src += '</table>';
            src += '<table>';
            src += '<tr><th colspan="4">' + e + '</th></tr>' + head;
        }
    });
    src += '</table>';


    for (var e of ['yerin', 'yuju', 'viviz', 'misc']) {
        const music = await fetch('./music/'+ e +'.csv?ts=' + Date.now()).then((res) => res.text());
        src += '<table>';
        const head = '<tr class="head"><td>제목</td><td>금영</td><td>태진</td></tr>';
        music.trim().split('\n').forEach((e, i) => {
            if (e.trim() == '') return;
            if (e.includes(',,')) {
                e = e.split(',,');
                src += '<tr><td>' + e[0] + '</td><td>' + e[1] + '</td><td>' + e[2] + '</td></tr>';
            } else {
                if (i > 0) src += '</table>';
                src += '<table>';
                src += '<tr><th colspan="4">' + e + '</th></tr>' + head;
            }
        });
        src += '</table>';
    };

    document.getElementById('music_list').innerHTML = src;

})();