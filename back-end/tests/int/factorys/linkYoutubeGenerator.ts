
export default function _linkYoutubeGenerator(){
    const links=[
        "https://www.youtube.com/watch?v=Sid37M31gX4",
        "https://www.youtube.com/watch?v=AP1VKily-Ls",
        "https://www.youtube.com/watch?v=TUATZgrVlT0",
        "https://www.youtube.com/watch?v=pps8D3nV67A",
        "https://www.youtube.com/watch?v=hFYL73n7Ktg",
        "https://www.youtube.com/watch?v=X11t8fZ_X8I",
        "https://www.youtube.com/watch?v=56mu8KSUYqk",
        "https://www.youtube.com/watch?v=kxnge-9on4o"

    ]
    

    function getRandomIntInclusive(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    let randomNumber = getRandomIntInclusive(0,links.length-1)

    let linkUrl = links[randomNumber]
    console.log(linkUrl)

    return links[randomNumber]

}