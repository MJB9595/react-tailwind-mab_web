import React ,{useEffect,useRef}from 'react'
import useKakaoLoader from '../hook/useKaKaoLoader'
const MapView = ({selectedSpot, spots=[]}) => {

    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const markersRef = useRef([])
    const infoRef = useRef(null)

    const {ready} = useKakaoLoader()

    useEffect(()=>{
        if(!ready) return

        if(mapInstanceRef.current) return

        if(!mapRef.current)return

        window.kakao.maps.load(()=>{
            const center = new window.kakao.maps.LatLng(37.5665, 126.978)

            const map = new window.kakao.maps.Map(mapRef.current,{
                center,
                level:5
            })

            mapInstanceRef.current.map
            
            infoRef.current = new window.kakao.maps.InfoWindow({
                zIndex:10,
                removable:true
            })
        })
    },[ready])

    useEffect(()=>{

        if(!ready || !mapInstanceRef.current || !window.kakao?.maps) return

        const map = mapInstanceRef.current

        markersRef.current.forEach((m)=>m.setMap(null))

        markersRef.current=[]

        if(!spots.length) return

        spots.forEach((spot)=> {
            if(!spot.lat || !spot.lng) return

            const position = new window.kakao.maps.LatLng(
                Number(spot.lat),
                Number(spot.lng)
            )

            const marker = new window.kakao.maps.Marker({
                position,
                map
            })

            markersRef.current.push(marker)

            window.kakao.maps.event.addListener(marker, 'click', ()=>{
                if(infoRef.current){
                    infoRef.current.setContent(
                        `
                        <div class="p-2 min-w-[160px]">
                            <div class="font-semibold text-sm">
                                ${spot.name}
                            </div>
                            <div class="text-xs text-slate-500 mt-1">
                                ${spot.detail || '-'}
                            </div>
                            <div class="text-xs text-slate-500">
                                ${spot.phone || '-'}
                            </div>
                        </div>
                        `
                    )
                    infoRef.current.open(map,marker)
                }
            })

        })
    },[ready,spots])

    useEffect(()=>{
        if(!ready || !selectedSpot || !mapInstanceRef.current || !window.kakao?.maps) return

        const map = mapInstanceRef.current

        const {lat, lng} = selectedSpot
        
        if(!lat || !lng) return

        const position = new window.kakao.maps.LatLng(Number(lat), Number(lng))
        map.setCenter(position)
        map.setLevel(3)

        const marker = markersRef.current.find(
            (m)=>m.spot?.name ===selectedSpot.name
        )
        
        if(marker && infoRef.current) {
            infoRef.current.setContent(
                `<div class="p-2 min-w-[160px]">
                    <div class="font-semibold text-sm">${selectedSpot.name}</div>
                    <div class="text-xs text-slate-500 mt-1">${selectedSpot.detail || '-'}</div>
                    <div class="text-xs text-slate-500">${selectedSpot.phone || '-'}</div>
                </div>`
            )
            infoRef.current.open(map,marker)
        }

    },[ready,selectedSpot])
  return <div ref={mapRef} className='w-full h-full'/>
}

export default MapView