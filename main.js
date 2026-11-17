const videos = document.querySelectorAll('video')

videos.forEach(video => {
  video.addEventListener('play', () => {
    videos.forEach(other => {
      if (other != video) other.pause()
    })
  })
})

const copied = document.getElementById('copied')

document.querySelector('.discord').addEventListener('click', e => {
  navigator.clipboard.writeText(e.target.dataset.name)
  copied.style.display = 'block'
  setTimeout(() => copied.style.display = 'none', 1500)
})
