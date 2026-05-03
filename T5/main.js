const players = [
  {
    file: 'audio/zyrjia.mp3',
    name: '臭臭',
    emoji: '🌙',
    titleTag: '香香的火男',
    tags: ['温柔', '耐心', 'ACE'],
    stars: 5,
  },
  {
    file: 'audio/6xht.mp3',
    name: '神秘t',
    emoji: '🎸',
    titleTag: 'S 段位陪玩',
    tags: ['活泼', '搞笑', '和平精英'],
    stars: 5,
  },
  {
    file: 'audio/tttt.mp3',
    name: '瞳',
    emoji: '🌸',
    titleTag: '钻石段陪玩',
    tags: ['甜美', '治愈', '原神'],
    stars: 5,
  },
  {
    file: 'audio/dyt.mp3',
    name: 'T',
    emoji: '🔥',
    titleTag: '传说段陪玩',
    tags: ['霸气', '稳健', '王者荣耀'],
    stars: 5,
  },
  {
    file: 'audio/6xh1.mp3',
    name: '小鱼',
    emoji: '⚡',
    titleTag: 'MVP 专属陪玩',
    tags: ['温柔', '最甜', '可爱'],
    stars: 5,
  },
  {
    file: 'audio/zyr长得帅.mp3',
    name: '艺人·帅',
    emoji: '✨',
    titleTag: '等我出把宗师',
    tags: ['帅气', '贴心', '宗师'],
    stars: 5,
  },
  {
    file: 'audio/6xhyu.mp3',
    name: '小小鱼',
    emoji: '🐟',
    titleTag: '元气担当',
    tags: ['元气', '幽默', '双排优选'],
    stars: 5,
  },
  {
    file: 'audio/李华.mp3',
    name: '李华',
    emoji: '🌹',
    titleTag: '本宫1A秒了你',
    tags: ['富婆', '幽默', '国服'],
    stars: 5,
  },
];

let currentAudio = null;
let currentBtn = null;

const grid = document.getElementById('grid');

players.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';

  const starsHTML = '★'.repeat(p.stars) + (p.stars < 5 ? '☆'.repeat(5 - p.stars) : '');
  const tagsHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const waveBars = Array.from({ length: 10 }, () => `<div class="waveform-bar"></div>`).join('');

  card.innerHTML = `
    <div class="card-top">
      <div class="avatar-wrap">
        <div class="avatar-ring"></div>
        <div class="avatar">
          <div class="avatar-inner">${p.emoji}</div>
        </div>
      </div>
      <div class="name">${p.name}</div>
      <div class="title-tag">${p.titleTag}</div>
      <div class="stars">${starsHTML}</div>
      <div class="tags" style="margin-top:0.6rem;">${tagsHTML}</div>
    </div>
    <div class="card-divider"></div>
    <div class="card-bottom">
      <button class="play-btn" aria-label="播放 ${p.name} 的声音">
        <div class="play-icon"></div>
        <div class="pause-icon"><span></span><span></span></div>
      </button>
      <div class="play-info">
        <div class="play-label">点击收听声音</div>
        <div class="waveform">${waveBars}</div>
      </div>
    </div>
  `;

  const btn = card.querySelector('.play-btn');
  const label = card.querySelector('.play-label');

  btn.addEventListener('click', () => {
    if (currentBtn === btn) {
      if (currentAudio.paused) {
        currentAudio.play();
        btn.classList.add('playing');
        label.textContent = '正在播放…';
      } else {
        currentAudio.pause();
        btn.classList.remove('playing');
        label.textContent = '点击收听声音';
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentBtn.classList.remove('playing');
      const oldLabel = currentBtn.closest('.card-bottom').querySelector('.play-label');
      oldLabel.textContent = '点击收听声音';
    }

    const audio = new Audio(p.file);
    audio.play();
    btn.classList.add('playing');
    label.textContent = '正在播放…';
    currentAudio = audio;
    currentBtn = btn;

    audio.onended = () => {
      btn.classList.remove('playing');
      label.textContent = '点击收听声音';
      currentAudio = null;
      currentBtn = null;
    };
  });

  grid.appendChild(card);
});
