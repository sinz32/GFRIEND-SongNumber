(async function() {

    var s = (n) => n == '-' ? '<font color=GRAY>(미수록)</font>' : n;

    var src = '';
    var src_mobile = ''

    const ko = await fetch('./music/ko.csv?ts=' + Date.now()).then((res) => res.text());
    var head = '<tr class="head"><td>제목</td><td>금영</td><td>태진</td><td>JOYSOUND</td></tr>';
    ko.trim().split('\n').forEach((e, i) => {
        e = e.trim();
        if (e == '') return;
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
    ko.trim().split('\n').forEach((e, i) => {
        e = e.trim();
        if (e == '') return;
        if (e.includes(',,')) {
            e = e.split(',,');
            src_mobile += '<tr class="head"><td colspan="2">' + e[0] + '</td></tr>';
            src_mobile += '<tr><td style="width:50%">금영 : ' + s(e[1]) + '</td><td class="mid">태진 : ' + s(e[2]) + '</td></tr>';
            src_mobile += '<tr><td colspan="2">JOYSOUND : ' + s(e[3]) + '</td></tr>';
        } else {
            if (i > 0) src_mobile += '</table>';
            src_mobile += '<table>';
            src_mobile += '<tr><th colspan="2">' + e + '</th></tr>';
        }
    });
    src_mobile += '</table>';

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
    ja.trim().split('\n').forEach((e, i) => {
        e = e.trim();
        if (e == '') return;
        if (e.includes(',,')) {
            e = e.split(',,');
            src_mobile += '<tr class="head"><td colspan="2">' + e[0] + '</td></tr>';
            src_mobile += '<tr><td style="width:70%">JOYSOUND : ' + s(e[1]) + '</td><td class="mid">e-bo : ' + e[2] + '</td></tr>';
        } else {
            if (i > 0) src_mobile += '</table>';
            src_mobile += '<table>';
            src_mobile += '<tr><th colspan="2">' + e + '</th></tr>';
        }
    });
    src_mobile += '</table>';


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
        music.trim().split('\n').forEach((e, i) => {
            e = e.trim();
            if (e == '') return;
            if (e.includes(',,')) {
                e = e.split(',,');
                src_mobile += '<tr class="head"><td colspan="2">' + e[0] + '</td></tr>';
                src_mobile += '<tr><td style="width:50%">금영 : ' + s(e[1]) + '</td><td class="mid">태진 : ' + s(e[2]) + '</td></tr>';
            } else {
                if (i > 0) src_mobile += '</table>';
                src_mobile += '<table>';
                src_mobile += '<tr><th colspan="2">' + e + '</th></tr>';
            }
        });
        src_mobile += '</table>';
    };

    document.getElementById('music_list_pc').innerHTML = src;
    document.getElementById('music_list_mobile').innerHTML = src_mobile;

})();