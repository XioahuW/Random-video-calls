// 获取当前页面的设置按钮元素（假设主页面的设置按钮id为settingsButton）
const settingsButton = document.getElementById('settingsButton');

// 创建一个隐藏的设置面板（这里采用div元素模拟，后续可以根据需要完善样式和结构）
const settingsPanel = document.createElement('div');
settingsPanel.id ='settings-panel';
settingsPanel.style.display = 'none';
settingsPanel.style.position = 'absolute';
settingsPanel.style.top = '20px';
settingsPanel.style.right = '20px';
settingsPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
settingsPanel.style.padding = '20px';
settingsPanel.style.borderRadius = '10px';
settingsPanel.style.zIndex = '2';

// 声音设置部分
const soundSettingsTitle = document.createElement('h2');
soundSettingsTitle.textContent = '声音设置';

const inputVolumeLabel = document.createElement('label');
inputVolumeLabel.textContent = '输入音量：';
const inputVolumeRange = document.createElement('input');
inputVolumeRange.type = 'range';
inputVolumeRange.min = 0;
inputVolumeRange.max = 100;
inputVolumeRange.value = 50;

const outputVolumeLabel = document.createElement('label');
outputVolumeLabel.textContent = '输出音量：';
const outputVolumeRange = document.createElement('input');
outputVolumeRange.type = 'range';
outputVolumeRange.min = 0;
outputVolumeRange.max = 100;
outputVolumeRange.value = 50;

const inputDeviceLabel = document.createElement('label');
inputDeviceLabel.textContent = '输入设备：';
const inputDeviceSelect = document.createElement('select');
// 这里暂时添加两个示例设备选项，后续需根据实际获取设备列表动态填充
const option1 = document.createElement('option');
option1.value = 'device1';
option1.textContent = '麦克风1';
const option2 = document.createElement('option');
option2.value = 'device2';
option2.textContent = '麦克风2';
inputDeviceSelect.appendChild(option1);
inputDeviceSelect.appendChild(option2);

const outputDeviceLabel = document.createElement('label');
outputDeviceLabel.textContent = '输出设备：';
const outputDeviceSelect = document.createElement('select');
// 同样添加示例设备选项，后续动态更新
const option3 = document.createElement('option');
option3.value = 'device1';
option3.textContent = '扬声器1';
const option4 = document.createElement('option');
option4.value = 'device2';
option4.textContent = '扬声器2';
outputDeviceSelect.appendChild(option3);
outputDeviceSelect.appendChild(option4);

// 视频设置部分
const videoSettingsTitle = document.createElement('h2');
videoSettingsTitle.textContent = '视频设置';

const inputSourceLabel = document.createElement('label');
inputSourceLabel.textContent = '输入设备：';
const inputSourceSelect = document.createElement('select');
// 示例视频输入设备选项，后续动态获取真实设备填充
const option5 = document.createElement('option');
option5.value = 'camera1';
option5.textContent = '摄像头1';
const option6 = document.createElement('option');
option6.value = 'camera2';
option6.textContent = '摄像头2';
inputSourceSelect.appendChild(option5);
inputSourceSelect.appendChild(option6);

const saveSettingsButton = document.createElement('button');
saveSettingsButton.textContent = '保存设置';

// 将各个元素添加到设置面板中
settingsPanel.appendChild(soundSettingsTitle);
settingsPanel.appendChild(inputVolumeLabel);
settingsPanel.appendChild(inputVolumeRange);
settingsPanel.appendChild(outputVolumeLabel);
settingsPanel.appendChild(outputVolumeRange);
settingsPanel.appendChild(inputDeviceLabel);
settingsPanel.appendChild(inputDeviceSelect);
settingsPanel.appendChild(outputDeviceLabel);
settingsPanel.appendChild(outputDeviceSelect);
settingsPanel.appendChild(videoSettingsTitle);
settingsPanel.appendChild(inputSourceLabel);
settingsPanel.appendChild(inputSourceSelect);
settingsPanel.appendChild(saveSettingsButton);

// 将设置面板添加到页面主体中（假设页面主体元素为document.body，可根据实际情况调整）
document.body.appendChild(settingsPanel);

// 显示/隐藏设置面板的函数
function toggleSettingsPanel() {
  if (settingsPanel.style.display === 'none') {
    settingsPanel.style.display = 'block';
  } else {
    settingsPanel.style.display = 'none';
  }
}

// 设置保存功能函数（目前仅打印示例，后续需完善实际保存逻辑）
function saveSettings() {
  const inputVolume = inputVolumeRange.value;
  const outputVolume = outputVolumeRange.value;
  const inputDevice = inputDeviceSelect.value;
  const outputDevice = outputDeviceSelect.value;
  const inputSource = inputSourceSelect.value;

  console.log("输入音量:", inputVolume);
  console.log("输出音量:", outputVolume);
  console.log("输入设备:", inputDevice);
  console.log("输出设备:", outputDevice);
  console.log("视频输入设备:", inputSource);

  // 这里可以添加代码将设置保存到本地存储或者发送到服务器等实际操作
}
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
   .then(stream => {
        localVideo.srcObject = stream;
        const peerConnection = new RTCPeerConnection();
        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
        });
        peerConnection.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
        };
        // 创建并发送 Offer
        return peerConnection.createOffer();
    })
   .then(offer => {
        return peerConnection.setLocalDescription(offer);
    })
   .catch(error => {
        console.error('Error accessing media devices:', error);
    });
// 为设置按钮添加点击事件，点击时切换设置面板的显示隐藏状态
settingsButton.addEventListener('click', toggleSettingsPanel);

// 为保存设置按钮添加点击事件，点击时执行保存设置的操作
saveSettingsButton.addEventListener('click', saveSettings);
