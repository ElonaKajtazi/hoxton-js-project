import './style.css'

function render(){
  let mainEl=document.querySelector('#app')
  if (mainEl===null)return
  mainEl.textContent = ""
  let h1El=document.createElement('h1')
  h1El.textContent = "Finishing the project"
  mainEl.append(h1El)
}
render()