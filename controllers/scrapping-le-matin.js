async function ScrappingLeMatin(res, req) {
    try {
        let { keyword, page } = req.body;
        let rsp
        if (page) rsp = await fetch('https://lematin.ma/sujet/' + keyword + '/' + page)
        else rsp = await fetch('https://lematin.ma/sujet/' + keyword);
        rsp = await rsp.text();
        rsp = rsp.split(`<div class="card mb-4">\n<a href="`);
        let articles = []
        for (const ele of rsp) {
            if (ele.includes('style="height: 152px; width: 100%; display: block;"') && !ele.includes('/video/')) {
                let firstSplit = ele.split('">\n<div class="card-body p-0 p-relative">');
                let title = firstSplit[1].split('" alt="')[1].split('" style="height: 152px; width: 100%; display: block;"')[0];
                articles.push({
                    title: title,
                    link: 'https://lematin.ma' + firstSplit[0]
                })
            }
        }
        res.send({
            status: true,
            articles: articles
        })
    }catch(e){
        console.log(e);
        res.send({
            status: false,
            articles: [],
            e
        })
    }
};

module.exports = ScrappingLeMatin;