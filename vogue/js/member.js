// 보그 PJ 회원가입 페이지 JS - member.js

// 약관동의 html코드 불러오기
import { mcode } from "./data/mem_data.js";

// console.log(mcode);
// 약관동의 html코드 넣기 : #conf
$('#conf').html(mcode.conf);

/********************************************* 
    약관동의 전체 체크시 모든 체크박스 변경하기
*********************************************/
// 1. 대상선정
// 1-1. 모두동의 체크박스 : #chk_all
const chkAll = $('#chk_all');
// 1-2. 개별체크박스 공통 : .chk
const chkEach = $('.chk');

// 2. 체크박스 변경 이벤트함수 만들기
chkAll.change(function(){
    // 1. 체크박스 체크여부 확인하기
    let isChk = $(this).prop('checked');
    console.log('체크양?',isChk);

    // 2. 전체 체크박스가 체크상태(true)이면
    // 개별체크박스도 모두 true로 체크상태 변경!
    // 미체크상태(false)면 개별박스도 모두 false!
    chkEach.prop('checked', isChk);
    // chkEach.attr('checked', isChk);
    // for문 없이도 여러개의 체크박스를 
    // 동시에 변경할 수 있음! 
    // attr()도 동일하게 변경가능!(읽기만 안됨!)
}); /////////// change /////////////////

/********************************************* 
    약관동의 개별 체크시 전체 체크박스 변경하기
*********************************************/
// 원리 : 개별체크박스가 모두 체크되면 전체체크하기
// 대상 : .chk -> chkEach변수
chkEach.change(function(){
    // 1. 체크개수 알아오기 : length -> 개수 리턴!
    let num = $('.chk:checked').length;
    // console.log('체크개수:',num);

    // 2. 체크개수가 3이면 전체체크박스 체크하기
    if(num==3) chkAll.prop('checked',true);
    else chkAll.prop('checked',false);
}); //////////// change ////////////////////

/************************************************* 
    동의 / 비동의 버튼 클릭시 처리하기
*************************************************/
// 대상: .YNbox button
// 통과조건 : #termsService 와 #termsPrivacy 
//              체크박스가 모두 체크되면 통과!
$('.YNbox button').click(function(){
    // 1. 버튼구분하기 : is 동의버튼? -> is('#btnY')
    let isBtn = $(this).is('#btnY');
    console.log('동의냐?',isBtn);

    // 2. 동의 버튼일 경우 : 필수체크확인후 회원가입허가!
    if(isBtn){
        if($('#termsService').prop('checked') && 
        $('#termsPrivacy').prop('checked')){
            // alert('통과');
            // 동의/비동의박스 스~윽 사라지기
            $('#conf').fadeOut(300,()=>{
                // 사라진후 회원가입박스 스~윽 나타나기
                $('.scont').fadeIn(300);
            }); /////////// fadeOut ///////

        } //// if ///
        else{
            alert('모든 필수항목에 체크하셔야 합니다~!');
        } /// else ///

    } /////////// if /////////////
    // 3. 비동의 버튼 클릭시 //////
    else{
        alert('비동의 하였으므로 메인 페이지로 이동합니다!');
        location.href = 'index.php';
    } //////// else //////

}); /////////// click /////////////

/***************************************************** 
    [ 속성값을 읽어오는 메서드 2가지 ]
    attribute 단어의 메서드 : attr(속성명)
    property 단어의 메서드 : prop(속성명)
    -> 둘의 차이는 일반 속성값을 읽어올때는 차이가 없다!
    체크박스의 checked 속성인 경우 true/false 를
    리턴해주는 것은 prop() 메서드뿐임!

    [ 속성값을 셋팅하는 메서드 2가지 ]
    1. attr(속성명,값)
    2. prop(속성명,값)
*****************************************************/





/********************************************** 
    [ 사용자 입력폼 유효성 검사 ]
    - 이벤트 종류 : blur(포커스가 빠질때 발생)
    - 제이쿼리 이벤트 메서드 :  blur()
    - 이벤트 대상: 
    ->입력요소 중 text(아이디email2제외),password
        form.logF input[type=text][id!=email2],
        form.logF input[type=password],
    -> 요소뒤 대괄호는 속성선택자(CSS원래문법)
    [id!=email2] !=은 같지않다(제이쿼리용문법)

**********************************************/
$(`form.logF input[type=text][id!=email2],
form.logF input[type=password]`)
  // .on('blur',function(){})
  .blur(function () {
    // 1. 현재 블러가 발생한 요소의 아이디는?
    let cid = $(this).attr("id");
    // cid 는 current id 즉, 현재 아이디

    // 모든 공백 제거함수(get rid of Space)
    const groSpace = x => x.replace(/\s/g,'');
    // replace(정규식,바꿀문자)
    // 정규식은 슬래쉬 사이에 표현 : \s 공백문자
    // g는 global 즉, 전역적으로 찾으라는 플래그 문자

    // 2. 현재 블러가 발생한 요소의 값은?
    // 이름입력창(id=='mnm')이면 trim() 나머지는 groSpace()
    // 로 처리하여 공백을 제거한다!
    let cv = 
    cid=='mnm'? 
    $(this).val().trim():
    groSpace($(this).val());
    // 비?집:놀이동산
    
    // 입력창 공백처리후 재입력하기!
    $(this).val(cv);

    // console.log("id는?", cid, "/값은?", cv);

    /************************************* 
        3. 빈값 여부 검사하기 (필수입력항목)
    *************************************/
    if (cv == "") {
      //메시지 출력하기
      $(this).siblings(".msg").text("필수입력!")
      .removeClass('on');

      // [ 불통과시 pass값 변경1 ]
      pass = false;
    } //////// if //////

    /**************************************** 
        4. 아이디일 경우 유효성 검사
        - 검사기준: 
        영문자로 시작하는 6~20글자 영문자/숫자
    ****************************************/
   else if(cid == 'mid'){
        // console.log('아이디 검사결과:',vReg(cv,cid));
        if(!vReg(cv,cid)){ // 아이디검사 불통과시 들어감(!NOT)
            $(this).siblings('.msg')
            .text('영문자로 시작하는 6~20글자 영문자/숫자')
            .removeClass('on');

            // [ 불통과시 pass값 변경2 ]
            pass = false;
        } //////// if ///////
        else{ // 통과시
            /* 
                [ Ajax로 중복아이디 검사하기! ]
                ajax 처리 유형 2가지

                1) post 방식 처리 메서드
                - $.post(URL,data,callback)

                2) get 방식 처리 메서드
                - $.get(URL,callback)
                -> get방식은 URL로 키=값 형식으로 데이터전송함!

                3) 위의 2가지 유형 중 처리선택 메서드
                - $.ajax({
                    전송할페이지,
                    전송방식,
                    보낼데이터,
                    전송할데이터타입,
                    비동기옵션,
                    성공처리,
                    실패처리
                })
                -> 보내는 값은 하나(객체데이터)
                -> 객체안에 7가지 유형의 데이터를 보냄!
            */
                $.ajax({
                    //1.전송할페이지(url)
                    url:"./process/chkID.php",
                    //2.전송방식(type)
                    type:"post",
                    //3.보낼데이터(data) - 객체형식
                    data:{"mid":$('#mid').val()},
                    //4.전송할데이터타입(dataType)
                    dataType:"html",
                    //5.비동기옵션
                    // -> 비동기옵션은 본처리를 비동기적으로
                    // 처리하겠다는 것임(기본값 true)
                    // false로 해야 동기화 처리되어
                    // 불통과시 pass=false가 유효함!
                    async:false,
                    //6.성공처리(success)
                    success: function(res){
                        // res - 리턴된 결과값
                        if(res=='ok'){
                            $('#mid').siblings('.msg')
                            .text('멋진 아이디네요~!')
                            .addClass('on');
                        }//// if : ok시 ///////
                        // 아이디가 중복일 경우 //
                        else{
                            $('#mid').siblings('.msg')
                            .text('이미 사용중인 아이디입니다!')
                            .removeClass('on');
                            //[ 불통과시 pass값 변경추가 ]
                            pass = false;
                            console.log('중복ID:',pass);
                        } /// else : 아이디중복 ////
                    },
                    // 7.실패처리(error)
                    // xhr - XMLHttpRequest객체
                    // status - 실패상태코드
                    // error - 에러결과값
                    error:function(xhr,status,error){
                        alert('연결처리실패:'+error);
                    } ////// error //////
                })
                 //////////// ajax 메서드 ///////////

            // 1. DB에 조회하여 같은 아이디가 있다면
            // '이미 사용중인 아이디입니다' 와 같은 메시지출력
            // 2. 만약 DB조회하여 같은 아이다가 없다면
            // '멋진 아이디네요~!'와 같은 메시지출력
            // 여기서 우선은 DB조회 못하므로 통과시 메시지로 출력

            // 메시지 띄우기
            // $(this).siblings('.msg')
            // .text('멋진 아이디네요~!')
            // .addClass('on');
            // -> 비동기 통신 Ajax로 서버쪽에 아이디 중복검사필요!
        } ////// else //////

   } /////////////// else if : 아이디검사 ///////

    /**************************************** 
        5. 비밀번호일 경우 유효성 검사
        - 검사기준: 
        특수문자,문자,숫자포함 형태의 5~15자리
    ****************************************/
   else if(cid == 'mpw'){
        // console.log('비밀번호 검사결과:',vReg(cv,cid));
        if(!vReg(cv,cid)){ // 비밀번호검사 불통과시 들어감(!NOT)
            $(this).siblings('.msg')
            .text('특수문자,문자,숫자포함 형태의 5~15자리');

            // [ 불통과시 pass값 변경3 ]
            pass = false;
        } //////// if ///////
        else{ // 통과시            
            // 메시지 지우기
            $(this).siblings('.msg').empty();
        } ////// else //////

   } /////////////// else if : 비밀번호검사 ///////

    /**************************************** 
        6. 비밀번호확인일 경우 유효성 검사
        - 검사기준: 비빌번호 항목과 일치여부
    ****************************************/
   else if(cid == 'mpw2'){
        if(cv != $('#mpw').val()){ 
            $(this).siblings('.msg')
            .text('비밀번호가 일치하지 않습니다!');

            // [ 불통과시 pass값 변경4 ]
            pass = false;
        } //////// if ///////
        else{ // 통과시            
            // 메시지 지우기
            $(this).siblings('.msg').empty();
        } ////// else //////

   } ///////////// else if : 비밀번호확인검사 ///////

    /**************************************** 
        7. 이메일 유효성 검사
        - 검사기준: 이메일 형식에 맞는지 여부
    ****************************************/
   else if(cid == 'email1'){
        // 1. 이메일 주소 만들기 :  앞주소@뒷주소
        let comp = eml1.val() + '@' +
        (seleml.val()=='free'?eml2.val():seleml.val());
        // (비?집:놀이동산)
        // 선택박스값이 'free'인가?숨긴이메일입력창값:선택값

        // 2. 이메일 검사함수 호출하기!
        resEml(comp);

   } /////////////// else if : 비밀번호검사 ///////

    /// 모두 통과일 경우 메시지 지우기 ///////
    else {
      $(this).siblings(".msg").empty();
      // empty() - 내용을 지우는 메서드
    } /////// else //////
  }); ///////////////// blur 메서드 /////////////////

  /////////// 이메일 관련 대상선정 /////////////
  // 이메일 앞주소
  const eml1 = $('#email1');
  // 이메일 뒷주소
  const eml2 = $('#email2');
  // 이메일 뒷주소 선택박스
  const seleml = $('#seleml');
  ////////////////////////////////////////////

  /******************************************** 
    선택박스 변경시 이메일 검사하기
    ______________________________

    검사시점 : 선택박스에 change이벤트가 발생할때
    제이쿼리 메서드 : change()
    이벤트 대상 : #seleml -> seleml변수
  ********************************************/
 seleml.change(function(){
    // 1. 선택박스 변경된 값 읽어오기
    let cv = $(this).val();
    // console.log('선택값:',cv);

    // 2. 선택옵션별 분기
    // 2-1."선택해주세요"일 경우
    if(cv == 'init'){
        // 1. 메시지 출력
        eml1.siblings('.msg')
        .text('이메일 옵션선택 필수!')
        .removeClass('on');
        // 2. 직접입력창 숨기기
        eml2.fadeOut(300);
    } /////// if : 선택해주세요 ///////

    // 2-2.'직접입력'일 경우
    else if(cv == 'free'){
        // 1. 직접입력창 보이기
        eml2.fadeIn(300).val('').focus();
        // 숨긴입력창.나타나(300).값('').포커스()

        // 2. 기존 메시지 지우기
        eml1.siblings('.msg').empty();
    } ////// else if : 직접입력 //////

    // 2-3. 기타 이메일주소 선택일 경우
    else{
        // 1.직접입력창 숨기기
        eml2.fadeOut(300);

        // 2.이메일 전체주소 조합하기
        let comp = eml1.val() + '@' + cv;
        // cv 는 select의 option의 value값

        // 3. 이메일 유효성 검사함수 호출
        resEml(comp);

    } ////// else : 기타 이메일주소 ////
 }); ///////// change메서드 ///////////////////

 /*********************************************** 
    키보드 입력시 이메일 체크하기
    _______________________________

    - 키보드 관련 이벤트 : keypress, keyup, keydown
    1. keypress : 키가 눌려졌을때
    2. keyup : 키가 눌렸다가 올라올때
    3. keydown : 키가 눌려져서 내려가 있을때
    -> 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를
    사용해야할까? ->>> keyup

    - 이벤트 대상 : #email1, #email2
    -> 모든 이벤트함수와 연결하는 제이쿼리 메서드는?
    on(이벤트명,함수)
 ***********************************************/
$('#email1,#email2')
.on('keyup',function(){
    // 1. 현재 이벤트 대상 아이디 읽어오기
    let cid = $(this).attr('id');

    // 2. 현재 입력된 값 읽어오기
    // let cv = $(this).val();

    // console.log('입력아이디:',cid,'\n입력값:',cv);

    // 3. 이메일 뒷주소 셋팅하기
    let backEml = 
    cid == 'email1' ? seleml.val() : eml2.val();
    // 현재 입력아이디가 'email1'이면 선택박스값
    // 아니면 두번째 이메일창에 입력하는 것이므로
    // 두번째 이메일입력값을 뒷주소로 설정함!

    // 4. 만약 선택박스값이 'free'(직접입력)이면
    // 이메일 뒷주소로 변경함!
    if(seleml.val() == 'free') backEml = eml2.val();

    // 5. 이메일 전체주소 조합하기
    let comp = eml1.val() + '@' + backEml;

    // 6. 이메일 유효성 검사함수 호출
    resEml(comp);

}); ///////////////// keyup ///////////////////



  /****************************************** 
    함수명 : resEml (result Email)
    기능 : 이메일 검사결과 처리
  ******************************************/
 const resEml = comp => { // comp - 이메일주소
    // console.log('이메일주소:',comp);
    // console.log('이메일검사결과:',vReg(comp,'eml'));

    // 이메일 정규식 검사에 따른 메시지 보이기
    if(vReg(comp,'eml')){
        eml1.siblings('.msg')
        .text('적합한 이메일 형식입니다!')
        .addClass('on');
    } //////// if : 통과시 //////////
    else{
        eml1.siblings('.msg')
        .text('맞지않는 이메일 형식입니다!')
        .removeClass('on');

        // [ 불통과시 pass값 변경5 ]
        pass = false;
    } //////// else : 불통과시 ////////

 }; ///////////// resEml /////////////////





  /************************************** 
        비밀번호 글자 보이기/숨기기 셋팅
  **************************************/
  let eyeNum = 1;
  $('.eye')
  .css({ // 처음상태는 중간줄있고 흐림
    textDecoration: 'line-through',
    opacity: 0.5,
    cursor: 'pointer'
  }) //// css ////
  .click((e)=>{
    // 1. 글자보이기 타입전환 : type='text|password'
    $('#mpw').attr('type',eyeNum?'text':'password');
    // 2. CSS 디자인 전환 (안보일때는 흐리게 중간줄표시)
    $(e.target).css({
        textDecoration: eyeNum?'none':'line-through',
        opacity: eyeNum ? 1 : 0.5
    })
    // 상태값 전환 (eyeNum이 1이면 0, 0이면 1 할당!)
    eyeNum = eyeNum ? 0 : 1;
  }); ////////// click ///////////////

  /********************************************* 
    가입하기(submit) 버튼 클릭시 처리하기 
    __________________________________

    - form요소 내부의 submit버튼을 클릭하면
    기본적으로 form요소에 설정된 action속성값인
    페이지로 전송된다! 전체검사를 위해 이를 중지해야함!
    -> 중지방법은? event.preventDefault()!!!

    전체검사의 원리 : 
    전역변수 pass를 설정하여 true를 할당하고
    검사중간에 불통과 사유발생시 false로 변경!
    유효성 검사 통과여부를 판단한다!

    검사방법 :
    기존 이벤트 blur 이벤트를 강제로 발생시킨다!
    이벤트를 강제로 발생시키는 제이쿼리 메서드는?
    ->>> trigger(이벤트명)

  *********************************************/

    // 검사용 변수
    let pass = true;

    // 이벤트 대상: #btnj
    $('#btnj').click(e=>{
        // 호출확인
        console.log('가입해~!');

        // 1. 기본이동 막기
        e.preventDefault();

        // 2. pass 통과여부 변수에 true를 할당!
        pass = true;

        // 3. 입력창 blur이벤트 강제 발생시키기
        $(`form.logF input[type=text][id!=email2],
        form.logF input[type=password]`)
        .trigger('blur');

        // 최종통과 여부
        console.log('통과여부:',pass);

        // 4. 검사결과에 따라 메시지 보이기
        if(pass){
            // 오리지널 포스트 방식으로 전송함! -> ajax처리시엔 주석!
            // $('.logF').submit();
            // 현재 페이지 form정보가 모두 inc/ins.php로
            // 이동하여 데이터를 처리함 - 동기화방식

            // -> 현재 페이지를 가만히 두고 처리페이지로
            // 비동기적인 처리를 하는 것이 바로 Ajax!!!

            /* 
                [ Ajax를 이용한 POST방식으로 DB에
                데이터 입력하기 ]

                AJAX = Asyncronous Javascript and XML

                - 비동기통신이란? 쉽게 말해서 페이지가
                새로고쳐지지 않고 그대로 있으면서 일부분만
                서버통신을 하는 것을 말한다!
                - 제이쿼리는 POST방식으로 ajax를 처리하는
                메서드를 제공한다!

                [ POST방식 Ajax 메서드 ]
                $.post(URL,data,callback)
                $.post(전송할페이지,전송할데이터,전송후콜백함수)
            
            */
                $.post(
                    // 1. 전송할 페이지 : 백엔드개발 입력처리페이지
                    "process/ins.php",
                    // 2. 전송할 데이터 : {} 객체로 전송
                    {
                        // 1.아이디
                        "mid":$("#mid").val(),
                        // 2.비번
                        "mpw":$("#mpw").val(),
                        // 3.이름
                        "mnm":$("#mnm").val(),
                        // 4.성별 : 라디오태그에 value속성필수!
                        "gen":$(":radio[name=gen]:checked").val(),
                        // 5-1.이메일 앞주소
                        "email1":$("#email1").val(),
                        // 5-2.이메일 뒷주소
                        "seleml":$("#seleml").val(),
                        // 5-3.직접입력 이메일 뒷주소
                        "email2":$("#email2").val()
                    },
                    // 3. 전송후콜백함수
                    function(res){ // res - 리턴값 받기변수 
                        console.log('서버응답:',res);
                        /// 성공시 ///////
                        if(res === 'ok'){
                            alert('회원가입을 축하드립니다! 짝짝짝!');
                            // 최초로그인 위해 로그인페이지로!
                            location.replace('login.php');
                        } /// if : 성공시 ////
                        // 실패시 //////////
                        else{
                            alert(res);
                        } ///// else : 실패시 ////
                        
                    } ///////// 전송후 콜백함수 //////
                );
            ///////////////// ajax post() /////////

            // alert('회원가입을 축하드립니다! 짝짝짝!');
            // 원래는 POST방식으로 DB에 회원가입정보를
            // 전송하여 입력후 DB처리완료시 성공메시지나
            // 로그인 페이지로 넘겨준다!

            // 로그인 페이지로 리디렉션!
            // location.href = 'login.php';

            // 민감한 입력 데이터 페이지가 다시 돌아와서
            // 보이면 안되기 때문에 히스토리를 지우는
            // replace()로 이동한다!
            // location.replace('login.php');
        } //////// if : 통과시 ///////////
        else{ ///// 불통과시 //////
            alert('입력을 수정하세요~!');
        } //////// else : 불통과시 //////

    }); ///////////// click ///////////





/*//////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*///////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드 
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!

} //////////// vReg 함수 //////////////////////////////
///////////////////////////////////////////////////////


