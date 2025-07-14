let songindex=0;
let audioElement = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.querySelector('.masterSongName');
let volumeBar=document.getElementById('volumeBar');

let songs = [
    { 
        songName: "SoundHelix Song 1", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
        coverPath: "./cover/spot3.jpg", 
        duration: "03:20" 
    },
    { 
        songName: "SoundHelix Song 2", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
        coverPath: "./cover/spot4.jpg", 
        duration: "03:15" 
    },
    { 
        songName: "SoundHelix Song 3", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
        coverPath: "./cover/3.jpg", 
        duration: "03:25" 
    },
    { 
        songName: "SoundHelix Song 4", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", 
        coverPath: "./Cover/4.jpg", 
        duration: "03:30" 
    },
    { 
        songName: "SoundHelix Song 5", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", 
        coverPath: "./cover/5.jpg", 
        duration: "03:18" 
    },
    { 
        songName: "SoundHelix Song 6", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", 
        coverPath: "./Cover/6.jpg", 
        duration: "03:22" 
    },
    { 
        songName: "SoundHelix Song 7", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", 
        coverPath: "./cover/7.jpg", 
        duration: "03:28" 
    },
    { 
        songName: "SoundHelix Song 8", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", 
        coverPath: "./cover/8.jpg", 
        duration: "03:24" 
    },
    { songName: "SoundHelix Song 9", 
     filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", 
     coverPath: "./cover/9.jpg", duration: "03:26" },
    { songName: "SoundHelix Song 10", 
        filepath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", 
        coverPath: "./cover/10.jpg"
    }
];
audioElement.volume=0.6;
volumeBar.addEventListener('input',()=>{
  audioElement.volume=volumeBar.value/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')
    })
}

masterPlay.addEventListener('click',(e)=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
       console.log(e.currentTarget)
        gif.style.opacity=1;

        makeAllPlays();
        document.getElementById(songindex).classList.remove('fa-circle-play')
        document.getElementById(songindex).classList.add('fa-circle-pause')
    } else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
       console.log(e.currentTarget)
       
        gif.style.opacity=0;
        document.getElementById(songindex).classList.remove('fa-circle-pause');
        document.getElementById(songindex).classList.add('fa-circle-play');

    }
})

songItems.forEach((element,i)=>{
//   console.log(element,i);
element.getElementsByTagName('img')[0].src=songs[i].coverPath;
element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})

audioElement.addEventListener('timeupdate',()=>{
Progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value=Progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        
        if (clickedIndex === songindex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songindex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.pause(); 
            audioElement.src = songs[songindex].filepath;
            masterSongName.innerText = songs[songindex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});


document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=songs.length-1){
       songindex=0;
    } else{
        songindex+=1;
    }
     
         
   audioElement.pause(); 
    audioElement.src = songs[songindex].filepath;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    makeAllPlays();
    document.getElementById(songindex).classList.remove('fa-circle-play');
    document.getElementById(songindex).classList.add('fa-circle-pause');


})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }else{
        songindex-=1;
    }
    audioElement.pause(); // 🛠️ important
      audioElement.src = songs[songindex].filepath;
    masterSongName.innerText = songs[songindex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    makeAllPlays();
    document.getElementById(songindex).classList.remove('fa-circle-play');

    document.getElementById(songindex).classList.add('fa-circle-pause');
})