async function ScrappingHespress(res, req) {
    try {
        let { keyword, page } = req.body;
        let rsp
        if (page) rsp = await fetch('https://www.hespress.com/?action=ajax_search_result&paged=' + page + '&s=' + keyword)
        else rsp = await fetch('https://www.hespress.com/?action=ajax_search_result&paged=1&s=' + keyword);
        rsp = await rsp.text();
        rsp = rsp.split('class=\"stretched-link\" href=\"');
        let articles = []
        for (const ele of rsp) {
            if (ele.includes('\" >\n<div class=\'ratio-medium\'>\n<img ')) {
                let newSplit = ele.split('\" title=\"');
                articles.push({
                    title: newSplit[1].split('\" >\n<div')[0],
                    link: newSplit[0]
                })
            }
        }

        res.send({
            status: true,
            articles: articles
        })
    } catch (e) {
        res.send({
            status: false,
            articles: [],
            
        })
    }
};

module.exports = ScrappingHespress;