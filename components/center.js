import React, { useState } from 'react';
import axios from 'axios';
export default function centerPage(){

    const [text, setText] = useState('식이 출력됩니다.')
    const [input, setInput] = useState()

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role : 'user',
                content : input + "엑셀 식으로 알려줘"
            }
        ]
      };

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.NEXT_PUBLIC_API_KEY
        }
    };

    const handleTextareaChange = (event) => {
        setInput(event.target.value);
      };

    const change = () =>{
    axios.post('https://api.openai.com/v1/chat/completions', data, config)
        .then(response => {
            const data = response.data;
            const content = data.choices[0].message.content;
            setText(content)
        })
        .catch(error => {
            console.error(error);
        });
    }
    return(
    <>
    <h3>생성하고 싶은 엑셀 수식을 적어주세요</h3>
    <div id = "example">원하는 식을 텍스트로 Excel Generate AI에게 알려주세요</div>
    <div className = "input_area">
        <div className = "area-container">
            <textarea id="input" name="story" rows="1" placeholder="예를 들어, 열 A에서 모든 직원의 평균 급여를 찾고 싶습니다" value={input} onChange={handleTextareaChange} >
            </textarea>
        </div>
        <div className = "area-container">
            <div id = "output">{text}</div>
        </div>
    </div>
    <div id = "generate-container">
        <button id = "generate-button">생성하기</button>
    </div>

    <style jsx>{`
    h3{
        font-size : 30px;
    }
    .input_area{
        min-height: 400px;
        height : 100%;
        width : 100%;
        display : flex;
        justify-content : center;
    }
    .area-container{
        width : 100%;
        height : 100%;
        display : flex;
        justify-content: center;
    }
    #input{
        min-height: 400px;
        width: 92%;
        height: 89%;
        padding: 24px;
        border : solid;
        border-color: lightgray;
        border-radius:15px;
    }
    #output{
        min-height: 400px;
        font-size : 30px;
        width: 92%;
        height: 89%;
        padding: 24px;
        border : solid;
        border-color: lightgray;
        border-radius:15px;
    }
    #example{
        margin-bottom : 10px;
        color : #a9a9a9;
    }
    textarea{
        font-size : 30px;
    }
    #generate-container{
        width : 100%;
        margin-top : 30px;
        display : flex;
        justify-content : center;
    }
    #generate-button{
        border-radius : 30px;
        width : 200px;
        height : 50px;
        border : none;
        background-color: #0a30d8;
        color:white;
        padding: 15px 32px; /* 안쪽 여백 설정 */
        text-align: center; /* 텍스트 정렬 설정 */
        text-decoration: none; /* 밑줄 없애기 */
        display: inline-block; /* 인라인 블록으로 설정 */
        font-size: 16px; /* 글자 크기 설정 */
        margin: 4px 2px; /* 바깥쪽 여백 설정 */
        cursor: pointer; /* 마우스 커서 모양 설정 */
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); /* 그림자 설정 */
    }
    #generate-button:hover {
        background-color : blue;
      }
      #generate-button:active {
        background-color: red;
     }
    `}</style>
    </>
    )
}