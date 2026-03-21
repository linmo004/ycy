const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const games = ref([
      { id: 'rps', name: '石头剪刀布', icon: '✊', desc: '和角色对战，AI生成角色反应', badge: 'AI互动', url: 'game-rps.html' },
      { id: 'guess', name: '猜数字', icon: '🔢', desc: '猜0-100之间的数字', badge: null, url: 'game-guess.html' },
      { id: 'bomb', name: '数字炸弹', icon: '💣', desc: '接力报数，谁踩到爆炸', badge: null, url: 'game-bomb.html' },
      { id: 'divination', name: '次元占卜', icon: '🔮', desc: '输入问题，AI给出神秘签语', badge: 'AI', url: 'game-divination.html' },
      { id: 'lottery', name: '次元抽签', icon: '🎋', desc: '抽取次元风格的神秘签文', badge: 'AI', url: 'game-lottery.html' },
      { id: 'whois', name: '猜猜我是谁', icon: '🎭', desc: '根据人设描述猜角色', badge: 'AI', url: 'game-whois.html' },
      { id: 'memory', name: '记忆翻牌', icon: '🃏', desc: '经典配对翻牌游戏', badge: null, url: 'game-memory.html' },
      { id: 'test', name: '测试大全', icon: '📋', desc: '人格、相性、心理等AI测试', badge: 'AI', url: 'game-test.html' },
    ]);

    const enterGame = (g) => { window.location.href = g.url; };
    const goBack = () => { window.location.href = 'world.html'; };

    onMounted(async () => {
      const savedFont = await dbGet('customFont');
      if (savedFont && savedFont.src) {
        let style = document.getElementById('custom-font-style');
        if (!style) { style = document.createElement('style'); style.id = 'custom-font-style'; document.head.appendChild(style); }
        style.textContent = `@font-face { font-family: 'CustomGlobalFont'; src: url('${savedFont.src}'); } * { font-family: 'CustomGlobalFont', -apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif !important; }`;
      }
      const dark = await dbGet('darkMode');
      if (dark) document.body.classList.add('dark');
      const wp = await dbGet('wallpaper');
      if (wp) { document.body.style.backgroundImage = `url(${wp})`; document.body.style.backgroundSize = 'cover'; document.body.style.backgroundPosition = 'center'; }
      lucide.createIcons();
    });

    return { games, enterGame, goBack };
  }
}).mount('#games-app');
