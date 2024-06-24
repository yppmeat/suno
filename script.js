(async () => {
  const meta = await (await fetch('assets/meta.csv')).text();
  const table = document.getElementById('table');
  meta.split('\n').reverse().forEach(v => {
    if(!v) return;
    const [id, prompt, rate, date] = v.split(',');
    const tr = document.createElement('tr');
      const td1 = document.createElement('td');
        td1.innerText = prompt;
      const td2 = document.createElement('td');
        const audio = document.createElement('audio');
          audio.src = 'assets/' + id + '.mp3';
          audio.controls = true;
        td2.append(audio);
      const td3 = document.createElement('td');
        td3.innerText = '★★★★★☆☆☆☆'.slice(5 - +rate, 10 - +rate);
      const td4 = document.createElement('td');
        td4.innerText = '20' + date;
      tr.append(td1, td2, td3, td4);
    table.append(tr);
  });
  
  const audio = [...document.querySelectorAll('audio')];
  audio.forEach((v, i) => {
    v.addEventListener('play', e => {
      audio.forEach(v => {
        if(!v.paused && v != e.target) v.pause();
      });
    });
    
    v.addEventListener('ended', () => {
      if(!audio[i+1]) return;
      setTimeout(() => {
        audio[i+1].currentTime = 0;
        audio[i+1].play();
      }, 1000);
    });
  });
  
  let tempAudio = null;
  document.addEventListener('keydown', e => {
    if(e.key != ' ') return;
    const playing = audio.find(v => !v.paused);
    if(playing) {
      playing.pause();
      tempAudio = playing;
    } else {
      tempAudio.play();
    }
    e.preventDefault();
  });
})();
