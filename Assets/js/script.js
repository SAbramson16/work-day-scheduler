let savedItem = []
let timeBlock = document.querySelectorAll(".time-block");
let dayDisplayEl = $('#currentDay');
let currentHour = dayjs().hour();

$(function () {

  function loadItems() {
    let savedItem = JSON.parse(localStorage.getItem("savedItem"));
    savedItem.forEach(function (task) {
      $('#' + task.hour + ' .description').val(task.text)
    })
  }
  
  loadItems();
  displayDay();
  
  function displayDay() {
    let currentDay = dayjs().format('dddd MMM DD, YYYY hh:mm a');
    // console.log(currentDay);
    dayDisplayEl.text(currentDay);
  }

    function changeColor() {
      $('.time-block').each(function() {
        let timeBlock = parseInt(this.id);
        if (currentHour > timeBlock) {
          $(this).addClass('past');
        } if (currentHour === timeBlock) {
          $(this).addClass('present');
        } if (currentHour < timeBlock) {
          $(this).addClass('future');
        }
      })
    }

    changeColor();
    console.log("change color");
  
  $('.saveBtn').on('click', function() {
    let saveBtn = $(this);
    let textInput = saveBtn.siblings('.description').val();
    let time = saveBtn.closest('.time-block').attr('id');
    // console.log(textInput);
    // console.log(time);

    task = {
      text: textInput,
      hour: time,
    }
    console.log(task);
    let savedItem = JSON.parse(localStorage.getItem("savedItem")) || [];
    savedItem.push(task);
    localStorage.setItem("savedItem", JSON.stringify(savedItem));
  })

});