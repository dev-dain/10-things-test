
# 10-things-test
"나를 알아보는 10가지 질문" 심리테스트 웹앱

---
## 설명
- HTML5 + CSS3 + Vanilla JS로 만든 이미지 테스트 반응형 웹페이지입니다.  
- [개발일지 보기](https://dev-dain.tistory.com/22?category=816329)   
![실행예시](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FEwF2m%2FbtqDGIAgKyB%2FGK4kXuHrFzJL2Q9p4GKIYk%2Fimg.gif)

페이지 개발자 : [김다인](https://dev-dain.tistory.com)  
그림 작가 : [껴리](https://instagram.com/gyeoly27)  

---
## 수정 사용법
1. repo를 fork해서 다운로드받는다.
2. 준비한 질문과 답변을 js/data.js 파일의 qnaList에 옮긴다. 이 때, 각 답변에는 score가 필요하다.
	2-1. 이 테스트는 score를 합산하고 score range에 따라 결과를 달리하는 테스트이므로 결과를 낼 때 이 점을 주지해야 한다.
	![image](https://user-images.githubusercontent.com/43867665/126623637-19d87e7c-d36f-4eb3-896e-714dd44dcca4.png)
	이 부분을 본인의 질문과 답변에 맞게 수정하면 된다.
3. 준비한 결과와 설명을 js/data.js 파일의 infoList에 옮긴다. 이 때, score의 시작과 끝인 from과 to를 표시해야 하고, name(결과 이름), desc(결과 설명)과 더불어 mLeft 값이 필요하다.
	3-1. mLeft 값은 결과 페이지의 점수 바에서 핀 위치에서의 margin left 값이므로 조절이 필요할 때 수정하면 된다.
4. **(중요)** js/data.js 안의 qnaList와 infoList는 js/main.js에서 각각의 속성이 아주 중요하게 쓰이므로 함부로 삭제하거나 수정했을 경우 원하는대로 결과가 나오지 않을 수 있다. 유연하게 수정할 수 있으나, main.js의 어떤 부분과 연관되는지 잘 살피고 수정하기를 권한다.  
---
## 주의 사항
- 이 저장소의 에셋은 가급적 *fork해서 수정해주세요.* 
- 수정 시 README.md 파일에 출처(이 repo 주소와 원 개발자-Dain Kim-의 이름)를 적어주세요.
- 페이지의 결과 부분에 출처(이 repo 주소와 원 개발자-Dain Kim-의 이름)를 적어주세요.
- star는 제게 힘이 됩니다. ^^

---
## 라이센스
- 이 코드는 MIT 라이선스를 준수하여 사용 가능합니다.  
