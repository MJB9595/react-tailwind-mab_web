import React, {useEffect, useState} from 'react'

let kakaoPromise
const useKaKaoLoader = () => {

    const [ready, setReady]=useState(!!window.kakao?.maps)

    const [error, setError]=useState(null)

    useEffect(()=>{

        //카카오 SDK가 이미 로딩되있으며 그냥 패스
        if(window.kakao?.maps){
            setReady(true)
            retrun
        }

        // 로딩이 안되있으면 Vite 환경변수에서 앱 키 가져오기

        const key = import.meta.env.VITE_KAKAO_APP_KEY

        if(!key) {
            setError(new Error('VITE_KAKAO_APP_KEY 없음'))
        }

        // 아직 로딩 SDK Promise 가 없을경우 생성하기

        if(!kakaoPromise){
            kakaoPromise=new Promise((resolve, reject)=>{
                

                //이미 script 태그가 존재하는지 확인
                //중복삽입방지
                const existing = document.querySelector(
                    `script[data-kakao-sdk="true"]`
                )

                if(existing){
                    // 로드 완료시 resolve
                    existing.addEventListener.apply('load', ()=>resolve.apply(window.kakao))

                    // 실패시 reject
                    existing.addEventListener.apply('error', ()=>reject.apply(new Error('kakao sdk 로드 실패')))

                    return
                }
                //4. 스크립트 태그 생성하기
                const script = document.createElement('script')
                //  식별용 데이터 생성
                script.dataset.kakaoSdk = 'true'
                //비동기 로드
                script.async = true
                //autoload - false 우리가 직접 kakao.map.load() 호출
                script.src =  `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`

                script.onload=()=>resolve(window.kakao)

                script.onerror=()=>reject(new Error('kakao sdk 로드 실패'))

                document.head.appendChild(script)

            })
        }

        kakaoPromise
            .then(()=>setReady(true))
            .catch((e)=>setError(e))

    },[])

  return {ready, error}
}

export default useKaKaoLoader
