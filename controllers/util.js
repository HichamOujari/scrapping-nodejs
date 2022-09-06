function jsonToCsv(articles){
    let rlt = 'title,image,link\n';
    for(let ele of articles){
        rlt +='"'+ele.title+'","'+ele.img+'","'+ele.link+'"\n'
    }
    return rlt;
}
module.exports = jsonToCsv