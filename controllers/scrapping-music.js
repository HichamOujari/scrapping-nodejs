const jsonToCsv = require('./util')
const fetch = require("node-fetch")

async function ScrappingLeMatin(res, req) {
    try {
        let { keyword, page, format } = req.body;
        let rsp
        if (page) rsp = await fetch('https://bandcamp.com/search?page=' + page + '&q=' + keyword)
        else rsp = await fetch('https://bandcamp.com/search?q=' + keyword);
        rsp = await rsp.text();
        rsp = rsp.split(`<img src="`)
        let articles = []
        for (let ele of rsp) {
            if (ele.includes('<div class="heading">')) {
                img = ele.split('">')[0];
                let firstSplit = ele.split('<a href="')[1];
                firstSplit = firstSplit.split('">')
                let title = firstSplit[1].split('</a>')[0];
                articles.push({
                    title: title.replaceAll('\n', '').replaceAll('  ', ''),
                    link: firstSplit[0],
                    img: img
                })
            }
        }
        if (format) {
            res.set({
                'Content-Disposition': `attachment; filename="file.csv"`,
                'Content-Type': 'text/csv; charset=UTF-8',
            });
            res.send(await jsonToCsv(articles));
        }
        else res.send({
            status: true,
            articles: articles
        })
    } catch (e) {
        console.log(e);
        res.send({
            status: false,
            articles: [],
            e
        })
    }
};

module.exports = ScrappingLeMatin;