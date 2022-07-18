import './style.css'

function render(){
  let mainEl=document.querySelector('#app')
  if (mainEl===null)return
  mainEl.textContent = ""
  let h1El=document.createElement('h1')
  h1El.textContent = "Starting JS Project"
  mainEl.append(h1El)
}
render()