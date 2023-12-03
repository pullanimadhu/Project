const rulesbtn = document.getElementById('.rules_btn')
const closebtn = document.querySelector('.close_btn')
const tim = document.querySelector('.rules')

rulesbtn.addEventListener('click' , () =>{
    tim.classList.toggle('show_rules')
});
closebtn.addEventListener('click' , () =>{
    tim.classList.toggle('show_rules')

})