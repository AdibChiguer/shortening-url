let urlInput = document.getElementById("url-input");
let urlButton = document.getElementById("url-shortening-btn");
let resultBox = document.getElementById("resul");
let pErr = document.getElementById("err-p");


let previousUrl;
if (localStorage.urls != null) {
    previousUrl = JSON.parse(localStorage.urls);
} else {
    previousUrl = []
}
showPreviousUrl()
// GET/POST: https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html
urlButton.addEventListener('click' , () => {
  if(urlInput.value != ''){
    let url = urlInput.value;
    urlInput.value = '';
    axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then((res) => {
      let shortUrl = res.data.result.full_short_link ;

      resultBox.innerHTML += 
      `
      <div class="shorted-url_section-content">
        <p>${url}</p>
        <div class="shorted-rel_result">
        <p>${shortUrl}</p>
          <button onclick="copyToClipBoard(this.parentNode)">copy</button>
        </div>
      </div>
      `
      let shortUrlReslt = {
        url : resultBox.innerHTML,
      }
      
      previousUrl.push(shortUrlReslt)
      localStorage.setItem('urls', JSON.stringify(previousUrl));
      pErr.style.display = 'none';
      urlInput.style.border = 'none';
      urlInput.classList.remove('err-active')
    })
    .catch((err) => {
      console.log(err);
      // The link you entered is a disallowed link
      pErr.innerHTML = 'The link you entered is a disallowed link'
      pErr.style.display = 'block';
      urlInput.style.border = '3px solid #fa8282';
      urlInput.classList.add('err-active')
    })
  }
  else {
    // please add a link
    pErr.innerHTML = 'please add a link'
    pErr.style.display = 'block';
    urlInput.style.border = '3px solid #fa8282';
    urlInput.classList.add('err-active')
  }
})

function copyToClipBoard(element) {
  const p = element.querySelector('p');
  const textToCopy = p.innerHTML;
  const btn = element.querySelector('button');


  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      btn.innerHTML = 'Copied!';
      btn.style.backgroundColor = 'hsl(255, 11%, 22%)'
      btn.style.color = 'white'
    })
    .catch((error) => {
      console.error('Error copying text to clipboard:', error);
    });
}

function showPreviousUrl() {
  if(previousUrl !=  null){
    previousUrl.forEach(url => {
      resultBox.innerHTML += url.url;
    });
  }
}

function toggelMenu() {
  let menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}