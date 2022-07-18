import './style.css'

function render(){
  let mainEl=document.querySelector('#app')
  if (mainEl===null)return
  mainEl.textContent = ""
  let h1El=document.createElement('h1')
  h1El.textContent = "Don't finish it this early"
  let h2El=document.createElement('h2')
  h2El.textContent = "Cool, it works!"
  mainEl.append(h1El, h2El)
}
render()