// calendar element 취득
var calendarEl = $('#calendar')[0];

// full-calendar 생성하기
let calendar = new FullCalendar.Calendar(calendarEl, {

    height: '1000px', //calendar 높이 설정
    aspectRatio: 0.6,
    expandRows: true, //화면에 맞게 높이 재설정
    slotMinTime: '08:00', // Day 캘린더에서 시작 시간
    slotMaxTime: '20:00', // Day 캘린더에서 종료 시간
    //헤더에 표시할 툴바
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
    //initialDate: '2021-07-15', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
    // navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
    editable: true, // 수정 가능?
    // selectable: true, // 달력 일자 드래그 설정가능
    // nowIndicator: true, // 현재 시간 마크
    // dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
    locale: 'ko', // 한국어 설정

    eventAdd: function (obj) { // 이벤트가 추가되면 발생하는 이벤트
        console.log(obj);
    },
    eventChange: function (obj) { // 이벤트가 수정되면 발생하는 이벤트
        console.log(obj);
    },
    eventRemove: function (obj) { // 이벤트가 삭제되면 발생하는 이벤트
        console.log(obj);
    },
    dateClick: function (info) {
        console.log(info);
        //모달창 띄우기
        let modal = document.getElementById("modal");
        modal.style.display = "flex";
        let planlist=document.querySelector('.planlist');
        planlist.style.display="flex";
        //모달창에 날짜뿌려주기
        let title = document.querySelector("#modal .title h2");
        title.innerHTML = info.dateStr;


    },
    // select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
    //     var title = prompt('Event Title:');
    //     if (title) {            
    //         calendar.addEvent({
    //             title: title,
    //             start: arg.start,
    //             end: arg.end,
    //             allDay: arg.allDay
    //         })          
    //     }          
    //     calendar.unselect()
    // }
    events: [
        {
            title: 'Click for Google',
            url: 'http://google.com/',// 클릭시 해당 url로 이동
            start: '2024-01-12'
        },
        {
            title: 'BCH237',
            start: '2024-01-12',
            extendedProps: {
                department: 'BioChemistry'
            },
            description: 'Lecture'
        }
    ]


});
calendar.render();

let exerciseSelectDiv=document.querySelector('.exercise-select');
let planlistDiv=document.querySelector('.planlist');
let setsettingdiv=document.querySelector('.set-setting');

//모달창 닫기
const closeBtns = modal.querySelectorAll(".close-area")
closeBtns.forEach(function(closeBtn) {
    closeBtn.addEventListener("click", (e) => {
        modal.style.display = "none"
        exerciseSelectDiv.style.display="none";
        setsettingdiv.style.display="none";
    })
});

//모달창 바깥부분 눌렀을때 닫기
modal.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("modal-overlay")) {
        modal.style.display = "none"
        exerciseSelectDiv.style.display="none";
        setsettingdiv.style.display="none";
    }
})

//모달창 운동추가 버튼눌렀을때 div변경
let exaddBtn = document.querySelector(".exercise-add");
exaddBtn.addEventListener('click', (e) => {
    exerciseSelectDiv.style.display='flex'
    planlistDiv.style.display="none";
})

//세팅설정 버튼을 눌렀을때
let setBtn=document.querySelector('.setBtn');
setBtn.addEventListener('click',(e)=>{
    setsettingdiv.style.display="flex";
    exerciseSelectDiv.style.display="none";
})


//뒤로가기 버튼
let backBtns=document.querySelectorAll('.backBtn');
backBtns.forEach(function(backBtn) {

    backBtn.addEventListener('click',(e)=>{
    
        if(exerciseSelectDiv.style.display=="flex"){    //현재 modal창이 exercise-select div일때
            exerciseSelectDiv.style.display="none"
            planlistDiv.style.display="flex";
        }
        else if(setsettingdiv.style.display=="flex"){   //현재 modal창이 set-setting div일때
            exerciseSelectDiv.style.display="flex";
            setsettingdiv.style.display="none";
        }
    })
})
   
//세트 추가 버튼
let setAddBtn=document.querySelector('.setAddBtn');
setAddBtn.addEventListener('click',(e)=>{
    let tbody=document.querySelector('.set-table tbody');
    let childCount = tbody.childElementCount + 1;
    tbody.innerHTML+=`<td>${childCount}</td>
    <td><input type="text"> kg</td>
    <td><input type="text"></td>
    <td><input type="checkbox"></td>`;
})

let setDelBtn=document.querySelector('.setDelBtn');
setDelBtn.addEventListener('click',(e)=>{
    let tbody=document.querySelector('.set-table tbody');
    let rowCount = tbody.rows.length;

  if (rowCount > 1) {
    tbody.deleteRow(rowCount - 1);
  } else {
    alert("더 이상 삭제할 행이 없습니다.");
  }
})


