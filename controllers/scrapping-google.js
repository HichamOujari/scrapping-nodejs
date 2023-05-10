const jsonToCsv = require('./util')
const axios = require('axios')

async function ScrappingGoogle(res, req) {
    try {
        let { keyword, page, format } = req.body;
        let rsp
        const { data } = await axios.get('https://www.google.fr/search?q=' + keyword + '&tbm=nws');
        rsp = data
        rsp = rsp.split(`<div class="Gx5Zad fP1Qef xpd EtOod pkphOe"><a`)
        let articles = []
        for (let ele of rsp) {
            if (ele.includes('href="/url?q=')) {
                let firstSplit = ele.split('href="/url?q=')[1].split('&amp;');
                let title = ele.split('<div class="BNeawe vvjwJb AP7Wnd">')[1].split('</div>')[0];
                articles.push({
                    title: title,
                    link: firstSplit[0],
                    img: null
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

module.exports = ScrappingGoogle;