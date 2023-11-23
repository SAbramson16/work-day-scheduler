let savedItem = []
let timeBlock = document.querySelectorAll(".time-block");
let dayDisplayEl = $('#currentDay');
let currentHour = dayjs().hour();

$(function () {

  displayDay();

  //if there are no items saved in local storage, it's not able to retrieve data - add null conditional statement
  function loadItems() {
    savedItem = JSON.parse(localStorage.getItem("savedItem"));
    if (savedItem == null) {
      savedItem = []; 
    }
    savedItem.forEach(function (task) {
      $('#' + task.hour + ' .description').val(task.text);
    })
  }
  
  loadItems();
  
  function displayDay() {
    let currentDay = dayjs().format('dddd MMM DD, YYYY hh:mm a');
    // console.log(currentDay);
    dayDisplayEl.text(currentDay);
  }

  //targets a specific time block based on current hour
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
    
  //adds event listener to button and call upon siblings and decendents
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
  
    savedItem = JSON.parse(localStorage.getItem("savedItem")) || [];
    savedItem.push(task);
    localStorage.setItem("savedItem", JSON.stringify(savedItem));
  })
});

