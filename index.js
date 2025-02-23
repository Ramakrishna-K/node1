const { error } = require("console")
const http=require("http")
const url=require("url")
const port=3002
const movies=[
    {id:1,title:"Salaar",director: 'prasanth', year:2023, film:'Action'},
    {id:2,title:"Bahubali",director: 'Rajmouli', year:2021, film:'Action'},
    {id:3,title:"Darling",director: 'Karunakaran', year:2010, film:'Love'},
    {id:4,title:"Eeswar",director: 'Jayanth', year:2002, film:'ActionDrama'},
    {id:5,title:"Sahoo",director: 'Sujeeth', year:2019, film:'Action'}
]

const server=http.createServer((req,res)=>{
    const parsedurl=url.parse(req.url,true);
    const pathname=parsedurl.pathname;
    const query=parsedurl.query

    if(pathname==='/movies'){
        res.write(JSON.stringify(movies));
        res.end()
    }
    else if(pathname.startsWith("/movies/")){
        const movieid=parseInt(pathname.split('/')[2],10);// second index after split and base 10 gives number
        const movie=movies.find(m=>m.id===movieid);
        if(movie){
            res.write(JSON.stringify(movie))
            res.end()
        }else{
            res.write("error")
            res.end()
        }
    }
    else if(pathname==="/search"){
        const {film, director}=query;
        let filtered=movies;
        if(film){
            filtered=filtered.filter(m=> m.film.toLowerCase().includes(film.toLowerCase()));
        }
        if(director){
            filtered=filtered.filter(m=> m.director.toLowerCase().includes(director.toLowerCase()));
        }
        if(filtered.length>0){
            res.write(JSON.stringify(filtered))
            res.end()
        }
        else{
            res.write("search error")
            res.end()
        }
    }
    else{
        res.write({error:"route not found"})
        res.end()
    }
})

server.listen(port,()=>{
    console.log("server running...!")
})