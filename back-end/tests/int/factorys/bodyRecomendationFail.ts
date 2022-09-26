type range = 1|2|3|4

export default function _bodyRecomendationFail(caso:range){

    if(caso===1){
        const rec1={
            parametro_1_errado:"defalt Name1",
            youtubeLink:"https://www.youtube.com/watch?v=d1lhO06z_YM&list=RDKeow7QrEWSs&index=27"
        }
        return rec1
    }
    if(caso===2){
        const rec2={
            name:"defalt Name2",
            parametro_2_errdo:"https://www.youtube.com/watch?v=d1lhO06z_YM&list=RDKeow7QrEWSs&index=27"
        }
        return rec2
    }
    if(caso===3){
        const rec3={
            name:"",
            youtubeLink:"https://www.youtube.com/watch?v=d1lhO06z_YM&list=RDKeow7QrEWSs&index=27"
        }
        return rec3
    }
    if(caso===4){
        const rec4={
            name:"defalt Name4",
            youtubeLink:"https://www.google.com"
        }
        return rec4
    }
    
}