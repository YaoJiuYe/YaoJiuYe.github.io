
// 初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 创建粒子背景
            createParticles();
            
            // 获取DOM元素
            const addButton = document.getElementById('addButton');
            const addButtonContainer = document.getElementById('addButtonContainer');
            const addForm = document.getElementById('addForm');
            const closeForm = document.getElementById('closeForm');
            const birthdayForm = document.getElementById('birthdayForm');
            const nameInput = document.getElementById('nameInput');
            const dateInput = document.getElementById('dateInput');
            const noteInput = document.getElementById('noteInput');
            const birthdaysList = document.getElementById('birthdaysList');
            const birthdayCount = document.getElementById('birthdayCount');
            const nearestPerson = document.getElementById('nearestPerson');
            const nearestDate = document.getElementById('nearestDate');
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            const notification = document.getElementById('notification');
            
            // 头像上传相关元素
            const avatarPreview = document.getElementById('avatarPreview');
            const uploadBtn = document.getElementById('uploadBtn');
            const imageUpload = document.getElementById('imageUpload');
            const imageUrl = document.getElementById('imageUrl');
            
            // 页面导航相关元素
            const pages = document.querySelectorAll('.page');
            const homePage = document.getElementById('homePage');
            const birthdayPage = document.getElementById('birthdayPage');
            const anniversaryPage = document.getElementById('anniversaryPage');
            const eventsPage = document.getElementById('eventsPage');
            
            // 导航按钮
            const goToBirthdayBtn = document.getElementById('goToBirthdayBtn');
            const startJourneyBtn = document.getElementById('startJourneyBtn');
            const backFromAnniversaryBtn = document.getElementById('backFromAnniversaryBtn');
            const backFromEventsBtn = document.getElementById('backFromEventsBtn');
            
            // 圆形导航菜单
            const navToggle = document.getElementById('navToggle');
            const navItems = document.getElementById('navItems');
            const homeNav = document.getElementById('homeNav');
            const birthdayNav = document.getElementById('birthdayNav');
            const anniversaryNav = document.getElementById('anniversaryNav');
            const eventsNav = document.getElementById('eventsNav');
            
            // 个人资料区域
            const profileSection = document.getElementById('profileSection');
            const closeProfile = document.getElementById('closeProfile');
            const profileBirthdayCount = document.getElementById('profileBirthdayCount');
            const profileThisMonth = document.getElementById('profileThisMonth');
            const profileUpcoming = document.getElementById('profileUpcoming');
            const lastUpdated = document.getElementById('lastUpdated');
            
            // 音乐相关元素
            const musicElement = document.getElementById('backgroundMusic');
            const musicToggle = document.getElementById('musicToggle');
            const playPauseBtn = document.getElementById('playPauseBtn');
            const volumeSlider = document.getElementById('volumeSlider');
            const volumeIcon = document.getElementById('volumeIcon');
            const currentTrackEl = document.getElementById('currentTrack');
            const visualizerBars = document.querySelectorAll('.visualizer-bar');
            const progressContainer = document.getElementById('progressContainer');
            const progressBar = document.getElementById('progressBar');
            
            // 音乐状态
            let isPlaying = false;
            let currentTrackIndex = 0;
            let audioContext;
            let analyser;
            let dataArray;
            let animationId;
            
            // 音乐文件列表
            const musicFiles = [
                { file: 'Music/1.mp3', name: 'Andrew Prahlow - Travelersencore' },
                { file: 'Music/2.mp3', name: '江语 - Cable Car' },
                { file: 'Music/3.mp3', name: 'beabadoobee - Coffee' },
                { file: 'Music/4.mp3', name: 'fcj&Alys&demxntia - Gamble' },
                { file: 'Music/5.mp3', name: 'White Cherry - MELANCHOLY' },
                { file: 'Music/6.mp3', name: 'mj apanay&aren park - Time Machine' }
            ];
            
            // 初始化第一个音乐
            loadMusic(currentTrackIndex);
            
            // 圆形导航菜单切换
            navToggle.addEventListener('click', function() {
                navItems.classList.toggle('active');
                const icon = navToggle.querySelector('i');
                if (navItems.classList.contains('active')) {
                    icon.classList.remove('fa-home');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-home');
                }
            });

            // 关闭导航菜单函数
            function closeNavMenu() {
                navItems.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-home');
                }
            }
            
            // 导航到不同页面
            function navigateToPage(pageId) {
                // 隐藏所有页面
                pages.forEach(page => {
                    page.classList.remove('active');
                });
                
                // 显示目标页面
                document.getElementById(pageId).classList.add('active');
                
                // 控制添加按钮显示
                if (pageId === 'birthdayPage') {
                    addButtonContainer.classList.remove('hidden');
                } else {
                    addButtonContainer.classList.add('hidden');
                    addForm.classList.remove('visible');
                }
                
                // 关闭导航菜单
                navItems.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-home');
            }
            
            // 导航菜单项点击事件
            if (homeNav) {
                homeNav.addEventListener('click', function() {
                    navigateToPage('homePage');
                });
            }
            
            if (birthdayNav) {
                birthdayNav.addEventListener('click', function() {
                    navigateToPage('birthdayPage');
                });
            }
            
            if (anniversaryNav) {
                anniversaryNav.addEventListener('click', function() {
                    navigateToPage('anniversaryPage');
                });
            }
            
            if (eventsNav) {
                eventsNav.addEventListener('click', function() {
                    navigateToPage('eventsPage');
                });
            }
            
            if (galleryNav) {
                galleryNav.addEventListener('click', function() {
                    navigateToPage('galleryPage');
                });
            }
            
            // 页面内导航按钮
            if (goToBirthdayBtn) {
                goToBirthdayBtn.addEventListener('click', function() {
                    navigateToPage('birthdayPage');
                });
            }
            
            if (startJourneyBtn) {
                startJourneyBtn.addEventListener('click', function() {
                    navigateToPage('birthdayPage');
                });
            }
            
            if (backFromAnniversaryBtn) {
                backFromAnniversaryBtn.addEventListener('click', function() {
                    navigateToPage('homePage');
                });
            }
            
            if (backFromEventsBtn) {
                backFromEventsBtn.addEventListener('click', function() {
                    navigateToPage('homePage');
                });
            }
            
            // 展馆页面导航
            const goToGalleryBtn = document.getElementById('goToGalleryBtn');
            const backFromGalleryBtn = document.getElementById('backFromGalleryBtn');
            
            if (goToGalleryBtn) {
                goToGalleryBtn.addEventListener('click', function() {
                    navigateToPage('galleryPage');
                });
            }
            
            if (backFromGalleryBtn) {
                backFromGalleryBtn.addEventListener('click', function() {
                    navigateToPage('homePage');
                });
            }
            
            // 个人资料相关
            if (closeProfile) {
                closeProfile.addEventListener('click', function() {
                    profileSection.classList.remove('active');
                });
            }
            
            // 获取颜色名称
            function getColorName(colorCode) {
                const colorNames = {
                    'fairyPink': '梦幻粉',
                    'fairyBlue': '精灵蓝',
                    'fairyPurple': '魔法紫',
                    'fairyYellow': '阳光黄',
                    'fairyGreen': '自然绿'
                };
                return colorNames[colorCode] || colorCode;
            }
            
            // 更新个人资料统计数据
            function updateProfileStats() {
                const now = new Date();
                const currentMonth = now.getMonth();
                
                // 计算本月生日数量
                const thisMonthBirthdays = birthdays.filter(birthday => {
                    const birthDate = new Date(birthday.date);
                    return birthDate.getMonth() === currentMonth;
                }).length;
                
                // 计算即将到来的生日（30天内）
                const upcomingBirthdays = birthdays.filter(birthday => {
                    const birthDate = new Date(birthday.date);
                    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
                    if (nextBirthday < now) {
                        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                    }
                    const daysDiff = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
                    return daysDiff <= 30;
                }).length;
                
                // 更新显示
                profileBirthdayCount.textContent = birthdays.length;
                profileThisMonth.textContent = thisMonthBirthdays;
                profileUpcoming.textContent = upcomingBirthdays;
                
                // 更新最后更新时间
                const lastUpdateTime = localStorage.getItem('lastUpdated') || new Date().toLocaleString();
                lastUpdated.textContent = lastUpdateTime;
            }
            
            // 显示/隐藏添加表单
            addButton.addEventListener('click', function() {
                addForm.classList.add('visible');
                nameInput.focus();
                addForm.classList.add('hover-lift');
            });
            
            closeForm.addEventListener('click', function() {
                addForm.classList.remove('visible');
            });
            
            // 头像上传功能
            uploadBtn.addEventListener('click', function() {
                imageUpload.click();
            });
            
            imageUpload.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // 显示预览
                        avatarPreview.innerHTML = `<img src="${e.target.result}" alt="头像预览">`;
                        // 清空URL输入框
                        imageUrl.value = '';
                    }
                    
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            imageUrl.addEventListener('input', function() {
                if (this.value) {
                    // 显示预览
                    const img = document.createElement('img');
                    img.src = this.value;
                    img.alt = '头像预览';
                    img.onload = function() {
                        avatarPreview.innerHTML = '';
                        avatarPreview.appendChild(img);
                    }
                    img.onerror = function() {
                        avatarPreview.innerHTML = `<div class="avatar-placeholder"><i class="fa fa-user"></i></div>`;
                        showNotification('图片错误', '请输入有效的图片链接');
                    }
                } else {
                    // 清空预览
                    avatarPreview.innerHTML = `<div class="avatar-placeholder"><i class="fa fa-user"></i></div>`;
                }
            });
            
            // 点击通知关闭按钮
            notification.querySelector('.close-notification').addEventListener('click', function() {
                notification.classList.remove('show');
            });
            
            // 显示通知
            function showNotification(title, message) {
                notification.querySelector('.notification-title').textContent = title;
                notification.querySelector('.notification-message').textContent = message;
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
            
            // 添加生日
            birthdayForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = nameInput.value.trim();
                const date = dateInput.value;
                const note = noteInput.value.trim();
                
                // 获取头像
                let avatar = '';
                const imgPreview = avatarPreview.querySelector('img');
                if (imgPreview) {
                    avatar = imgPreview.src;
                } else if (imageUrl.value.trim()) {
                    avatar = imageUrl.value.trim();
                }
                
                if (name && date) {
                    // 添加到数组
                    birthdays.push({
                        id: Date.now(),
                        name: name,
                        date: date,
                        note: note,
                        avatar: avatar,
                        added: new Date().toISOString()
                    });
                    
                    // 保存到localStorage
                    saveBirthdays();
                    
                    // 更新最后更新时间
                    const now = new Date().toLocaleString();
                    localStorage.setItem('lastUpdated', now);
                    
                    // 重新渲染列表
                    renderBirthdays();
                    
                    // 更新倒计时
                    updateNearestBirthday();
                    
                    // 重置表单
                    nameInput.value = '';
                    dateInput.value = '';
                    noteInput.value = '';
                    imageUrl.value = '';
                    avatarPreview.innerHTML = `<div class="avatar-placeholder"><i class="fa fa-user"></i></div>`;
                    imageUpload.value = '';
                    
                    // 隐藏表单
                    addForm.classList.remove('visible');
                    
                    // 显示添加成功效果
                    showConfetti();
                    
                    // 显示通知
                    showNotification('生日添加成功', `${name}的生日已添加到列表！`);
                }
            });
            
            // 显示彩色纸屑效果
            function showConfetti() {
                const confettiContainer = document.createElement('div');
                confettiContainer.className = 'fixed inset-0 pointer-events-none z-50';
                document.body.appendChild(confettiContainer);
                
                const colors = ['#FF9EB5', '#87CEFA', '#DDA0DD', '#FFFACD', '#98FB98'];
                const symbols = ['❀', '✨', '🌟', '🎀', '🎈', '🎉', '🎊', '🎁'];
                
                for (let i = 0; i < 70; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'absolute text-xl';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.top = '-30px';
                    confetti.style.opacity = '0';
                    confetti.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
                    confetti.style.zIndex = '1000';
                    confettiContainer.appendChild(confetti);
                    
                    // 动画
                    setTimeout(() => {
                        confetti.style.opacity = '1';
                        confetti.style.transition = `transform ${Math.random() * 2 + 2}s ease-out, opacity ${Math.random() * 1 + 1}s ease-in`;
                        confetti.style.transform = `translateY(${window.innerHeight + 50}px) 
                                                  translateX(${Math.random() * 100 - 50}px)
                                                  rotate(${Math.random() * 360}deg)`;
                        confetti.style.opacity = '0';
                    }, 10);
                }
                
                // 清理
                setTimeout(() => {
                    document.body.removeChild(confettiContainer);
                }, 3000);
            }
            
            // 删除生日
            const deleteBirthday = (id) => {
                const birthday = birthdays.find(b => b.id === id);
                if (birthday) {
                    // 添加删除动画
                    const card = document.querySelector(`.fairy-card[data-id="${id}"]`);
                    if (card) {
                        card.classList.add('slide-out');
                        
                        setTimeout(() => {
                            birthdays = birthdays.filter(b => b.id !== id);
                            saveBirthdays();
                            renderBirthdays();
                            updateNearestBirthday();
                            
                            // 更新最后更新时间
                            const now = new Date().toLocaleString();
                            localStorage.setItem('lastUpdated', now);
                            
                            // 显示通知
                            showNotification('生日已删除', `${birthday.name}的生日已从列表中移除`);
                        }, 300);
                    }
                }
            };
            
            // 将删除函数绑定到window对象，确保全局可访问
            window.deleteBirthday = deleteBirthday;
            
            // 保存生日到localStorage
            function saveBirthdays() {
                localStorage.setItem('birthdays', JSON.stringify(birthdays));
            }
            
            // 渲染生日列表
            function renderBirthdays() {
                birthdayCount.textContent = birthdays.length;
                
                if (birthdays.length === 0) {
                    birthdaysList.innerHTML = `
                        <div class="fairy-card p-6 text-center col-span-full hover-lift">
                            <div class="text-4xl text-fairyPrimary mb-4">
                                <i class="fa fa-birthday-cake"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-700 mb-2">添加第一个生日</h3>
                            <p class="text-gray-600 mb-4">点击右下角的添加按钮开始</p>
                            <div class="text-3xl text-fairyPrimary floating">
                                <i class="fa fa-arrow-down"></i>
                            </div>
                        </div>
                    `;
                    return;
                }
                
                // 按日期排序
                birthdays.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                
                let html = '';
                
                birthdays.forEach((birthday, index) => {
                    const now = new Date();
                    const birthDate = new Date(birthday.date);
                    
                    // 计算下一个生日日期
                    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
                    if (nextBirthday < now) {
                        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                    }
                    
                    // 计算天数差
                    const diffTime = nextBirthday - now;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    // 格式化生日日期
                    const options = { month: 'long', day: 'numeric' };
                    const formattedDate = birthDate.toLocaleDateString('zh-CN', options);
                    
                    // 生成卡片颜色
                    const colors = ['fairyPink', 'fairyBlue', 'fairyPurple', 'fairyYellow', 'fairyGreen'];
                    const color = colors[index % colors.length];
                    
                    // 头像显示（带动画效果）
                    let avatarHtml = '';
                    if (birthday.avatar) {
                        avatarHtml = `<div class="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-4 border-${color} transform transition-all duration-500 hover:scale-110 hover:rotate-12 hover:border-fairyPrimary group relative">
                                        <img src="${birthday.avatar}" alt="${birthday.name}的头像" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125">
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                                            <span class="text-white text-xs font-medium">${birthday.name}</span>
                                        </div>
                                     </div>`;
                    } else {
                        avatarHtml = `<div class="w-16 h-16 rounded-full bg-gradient-to-r from-${color} to-fairySecondary mx-auto mb-4 flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-12 animate-pulse-slow">
                                        <i class="fa fa-user text-white text-xl"></i>
                                     </div>`;
                    }
                    
                    // 添加备注显示
                    const noteHtml = birthday.note ? 
                        `<div class="text-sm text-gray-500 italic mt-2">备注: ${birthday.note}</div>` : '';
                    
                    html += `
                        <div class="fairy-card p-6 hover-lift transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg animate-in" data-id="${birthday.id}">
                            <div class="flex justify-between items-start mb-4">
                                <div class="text-2xl text-${color}">
                                    <i class="fa fa-birthday-cake"></i>
                                </div>
                                <button onclick="deleteBirthday(${birthday.id})" class="text-gray-400 hover:text-red-500 transition-colors">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                            ${avatarHtml}
                            <h3 class="text-xl font-bold text-gray-700 mb-1">${birthday.name}</h3>
                            <p class="text-gray-600 mb-3">生日: ${formattedDate}</p>
                            <div class="text-center py-2 px-4 rounded-full bg-${color}/20 text-${color} font-medium text-sm mb-3">
                                ${diffDays} 天后
                            </div>
                            ${noteHtml}
                        </div>
                    `;
                });
                
                birthdaysList.innerHTML = html;
            }
            
            // 更新最近的生日
            function updateNearestBirthday() {
                if (birthdays.length === 0) {
                    nearestPerson.textContent = '添加生日开始倒计时';
                    daysEl.textContent = '00';
                    hoursEl.textContent = '00';
                    minutesEl.textContent = '00';
                    secondsEl.textContent = '00';
                    return;
                }
                
                const now = new Date();
                let nearestBirthday = null;
                let nearestPersonName = '';
                let minDiff = Infinity;
                
                birthdays.forEach(birthday => {
                    const birthDate = new Date(birthday.date);
                    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
                    
                    if (nextBirthday < now) {
                        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                    }
                    
                    const diff = nextBirthday - now;
                    
                    if (diff < minDiff) {
                        minDiff = diff;
                        nearestBirthday = nextBirthday;
                        nearestPersonName = birthday.name;
                    }
                });
                
                if (nearestBirthday) {
                    nearestPerson.textContent = `${nearestPersonName}的生日`;
                }
            }
            
            // 更新倒计时
            function updateCountdown() {
                if (birthdays.length === 0) return;
                
                const now = new Date();
                let nearestBirthday = null;
                let minDiff = Infinity;
                
                birthdays.forEach(birthday => {
                    const birthDate = new Date(birthday.date);
                    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
                    
                    if (nextBirthday < now) {
                        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                    }
                    
                    const diff = nextBirthday - now;
                    
                    if (diff < minDiff) {
                        minDiff = diff;
                        nearestBirthday = nextBirthday;
                    }
                });
                
                if (nearestBirthday) {
                    const diff = nearestBirthday - now;
                    
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    
                    // 添加数字变化动画
                    if (daysEl.textContent !== days.toString().padStart(2, '0')) {
                        daysEl.textContent = days.toString().padStart(2, '0');
                        daysEl.classList.add('number-pulse');
                        setTimeout(() => daysEl.classList.remove('number-pulse'), 1000);
                    }
                    
                    if (hoursEl.textContent !== hours.toString().padStart(2, '0')) {
                        hoursEl.textContent = hours.toString().padStart(2, '0');
                        hoursEl.classList.add('number-pulse');
                        setTimeout(() => hoursEl.classList.remove('number-pulse'), 1000);
                    }
                    
                    if (minutesEl.textContent !== minutes.toString().padStart(2, '0')) {
                        minutesEl.textContent = minutes.toString().padStart(2, '0');
                        minutesEl.classList.add('number-pulse');
                        setTimeout(() => minutesEl.classList.remove('number-pulse'), 1000);
                    }
                    
                    if (secondsEl.textContent !== seconds.toString().padStart(2, '0')) {
                        secondsEl.textContent = seconds.toString().padStart(2, '0');
                        secondsEl.classList.add('number-pulse');
                        setTimeout(() => secondsEl.classList.remove('number-pulse'), 1000);
                    }
                }
            }
            
            // 创建粒子背景
            function createParticles() {
                const container = document.getElementById('particles-container');
                const particleCount = 50;
                const colors = ['#FFB6C1', '#87CEFA', '#DDA0DD', '#FFFACD', '#98FB98', '#FFFFFF'];
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    // 随机大小
                    const size = Math.random() * 15 + 5;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    // 随机位置
                    particle.style.left = `${Math.random() * 100}vw`;
                    particle.style.top = `${Math.random() * 100}vh`;
                    
                    // 随机颜色
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    
                    // 随机动画
                    const duration = Math.random() * 30 + 20;
                    particle.style.animation = `floating ${duration}s ease-in-out infinite`;
                    particle.style.animationDelay = `${Math.random() * 5}s`;
                    
                    container.appendChild(particle);
                }
            }
            
            // 音乐相关功能
            function loadMusic(index) {
                if (musicFiles[index]) {
                    musicElement.src = musicFiles[index].file;
                    currentTrackEl.textContent = musicFiles[index].name;
                    currentTrackIndex = index;
                    
                    // 重置进度条
                    progressBar.style.width = '0%';
                }
            }
            
            function togglePlayPause() {
                if (isPlaying) {
                    musicElement.pause();
                    playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
                    stopVisualizer();
                } else {
                    musicElement.play().then(() => {
                        playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
                        startVisualizer();
                    }).catch(error => {
                        console.error('播放失败:', error);
                        showNotification('播放失败', '请点击音乐按钮手动授权播放');
                    });
                }
                isPlaying = !isPlaying;
            }

            // 播放音乐函数
            function playMusic() {
                if (!isPlaying) {
                    togglePlayPause();
                }
            }
            
            function nextTrack() {
                currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length;
                loadMusic(currentTrackIndex);
                if (isPlaying) {
                    musicElement.play();
                    startVisualizer();
                }
            }
            
            function prevTrack() {
                currentTrackIndex = (currentTrackIndex - 1 + musicFiles.length) % musicFiles.length;
                loadMusic(currentTrackIndex);
                if (isPlaying) {
                    musicElement.play();
                    startVisualizer();
                }
            }
            
            function updateVolume() {
                musicElement.volume = volumeSlider.value / 100;
                
                // 更新音量图标
                if (musicElement.volume === 0) {
                    volumeIcon.className = 'fa fa-volume-off text-gray-500';
                } else if (musicElement.volume < 0.5) {
                    volumeIcon.className = 'fa fa-volume-down text-gray-500';
                } else {
                    volumeIcon.className = 'fa fa-volume-up text-gray-500';
                }
            }
            
            function updateProgress() {
                const percent = (musicElement.currentTime / musicElement.duration) * 100;
                progressBar.style.width = `${percent}%`;
            }
            
            function setProgress(e) {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = musicElement.duration;
                musicElement.currentTime = (clickX / width) * duration;
            }
            
            function startVisualizer() {
                if (!audioContext) {
                    try {
                        audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const source = audioContext.createMediaElementSource(musicElement);
                        analyser = audioContext.createAnalyser();
                        analyser.fftSize = 32;
                        const bufferLength = analyser.frequencyBinCount;
                        dataArray = new Uint8Array(bufferLength);
                        
                        source.connect(analyser);
                        analyser.connect(audioContext.destination);
                    } catch (error) {
                        console.error('音频可视化初始化失败:', error);
                        return;
                    }
                }
                
                function animateVisualizer() {
                    animationId = requestAnimationFrame(animateVisualizer);
                    analyser.getByteFrequencyData(dataArray);
                    
                    visualizerBars.forEach((bar, i) => {
                        const height = (dataArray[i] / 255) * 30;
                        bar.style.height = `${height}px`;
                    });
                }
                
                animateVisualizer();
            }
            
            function stopVisualizer() {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    visualizerBars.forEach(bar => {
                        bar.style.height = '2px';
                    });
                }
            }
            
            // 音乐事件监听
            if (musicToggle) {
                musicToggle.addEventListener('click', togglePlayPause);
            }
            
            if (playPauseBtn) {
                playPauseBtn.addEventListener('click', togglePlayPause);
            }
            
            // 修正按钮id不匹配问题
            const prevTrackBtn = document.getElementById('prevTrack');
            const nextTrackBtn = document.getElementById('nextTrack');
            
            if (prevTrackBtn) {
                prevTrackBtn.addEventListener('click', prevTrack);
            }
            
            if (nextTrackBtn) {
                nextTrackBtn.addEventListener('click', nextTrack);
            }
            
            if (volumeSlider) {
                volumeSlider.addEventListener('input', updateVolume);
            }
            
            if (musicElement) {
                musicElement.addEventListener('timeupdate', updateProgress);
            }
            
            if (progressContainer) {
                progressContainer.addEventListener('click', setProgress);
            }
            
            // 生日数据
            let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
            
            // 初始化
            renderBirthdays();
            updateNearestBirthday();
            setInterval(updateCountdown, 1000);
            updateVolume();
            
            // 检查今天是否有生日
            function checkTodayBirthdays() {
                const now = new Date();
                const todayBirthdays = birthdays.filter(birthday => {
                    const birthDate = new Date(birthday.date);
                    return birthDate.getMonth() === now.getMonth() && 
                           birthDate.getDate() === now.getDate();
                });
                
                if (todayBirthdays.length > 0) {
                    let message = '';
                    if (todayBirthdays.length === 1) {
                        message = `${todayBirthdays[0].name}今天过生日哦！`;
                    } else {
                        const names = todayBirthdays.map(b => b.name).join('和');
                        message = `${names}今天都过生日哦！`;
                    }
                    
                    showNotification('生日快乐！', message);
                    
                    // 高亮显示今天的生日卡片
                    setTimeout(() => {
                        todayBirthdays.forEach(birthday => {
                            const card = document.querySelector(`.fairy-card[data-id="${birthday.id}"]`);
                            if (card) {
                                card.classList.add('birthday-highlight');
                                setTimeout(() => {
                                    card.classList.remove('birthday-highlight');
                                }, 3000);
                            }
                        });
                    }, 1000);
                }
            }
            
            // 页面加载时检查今天的生日
            checkTodayBirthdays();
        });
// 展馆页面导航已移至DOMContentLoaded事件监听器内

// 更新展馆统计数据
function updateGalleryStats() {
    // 从localStorage获取生日数据
    const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    document.getElementById('galleryBirthdayCount').textContent = birthdays.length;
}

// 统一页面切换函数已在初始化部分定义

// 更新导航图标
function updateNavToggleIcon(pageId) {
    const navToggleIcon = document.querySelector('#navToggle i');
    navToggleIcon.className = ''; // 清除现有类
    
    switch(pageId) {
        case 'homePage':
            navToggleIcon.className = 'fa fa-home';
            break;
        case 'birthdayPage':
            navToggleIcon.className = 'fa fa-birthday-cake';
            break;
        case 'galleryPage':
            navToggleIcon.className = 'fa fa-university';
            break;
    }
}
// 展馆页面返回按钮功能已在导航部分统一实现

// 添加生日表单的显示/隐藏功能已在初始化部分实现

// 音乐控制按钮事件已在初始化部分统一绑定

// 音量控制已在初始化部分统一绑定

// 音乐进度条控制已在初始化部分统一绑定

// 音乐控制相关函数已在初始化部分定义

// 生日表单提交功能已在初始化部分定义

// 显示通知函数已在DOMContentLoaded事件监听器内定义

// 通知关闭按钮功能已在初始化部分定义

// 头像上传和图片URL输入框功能已在初始化部分定义