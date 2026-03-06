import React, { useMemo, useState, useEffect, useContext } from 'react'
import MapView from '../components/MapView'
import { useLocation } from 'react-router-dom'
import { useFavoritesContext } from '../../contexts/FavoritesContext'
import { WifiContext } from '../hook/WifiDataContext'

const MapPage = () => {
  const { wifiData, loading } = useContext(WifiContext)
  
  const [q, setQ] = useState('')
  const [selectedSpot, setSelectedSpot] = useState(null)
  const { state } = useLocation()
  const { toggle, isFavorite } = useFavoritesContext()

  // 즐겨찾기 페이지에서 넘어왔을 때 좌표 체크 추가
  useEffect(() => {
    if (state?.selectedSpot) {
      const spot = state.selectedSpot
      if (!spot.lat || !spot.lng) {
        alert('해당 가게가 주소를 아직 등록하지 않았어요!')
      }
      setSelectedSpot(spot)
    }
  }, [state?.selectedSpot])

  // 리스트 항목 클릭 시 실행할 함수 (좌표 체크 로직 포함)
  const handleSelectSpot = (item) => {
    if (!item.lat || !item.lng) {
      alert('해당 가게가 주소를 아직 등록하지 않았어요!')
    }
    setSelectedSpot(item)
  }

  const filtered = useMemo(() => {
    const keyword = q.trim()

    if (!wifiData || wifiData.length === 0) return []

    if (!keyword) return wifiData.slice(0, 50)

    return wifiData
      .filter((x) =>
        (x.name + " " + x.detail)
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ).slice(0, 50)

  }, [q, wifiData])


  const isSameSpot = (a, b) =>
      a?.name === b?.name &&
      a?.lat === b?.lat &&
      a?.lng === b?.lng

  const spotsToShow=useMemo(()=>{
    if(!selectedSpot) return filtered
    if(filtered.some((f)=>isSameSpot(f,selectedSpot))){
      return filtered
    }
    return [selectedSpot,...filtered]
  },[filtered,selectedSpot])

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
        <p className="font-semibold text-slate-700">대용량 데이터를 불러오고 병합하는 중입니다...</p>
      </div>
    )
  }

  return (
    <div className='grid gap-4 lg:grid-cols-[1.4fr_0.6fr]'>
      <section className='overflow-hidden border rounded-2xl bg-white shadow-sm'>
        <div className='flex items-center justify-between border-b px-4 py-3'>
          <h1 className='text-base font-semibold'>Map</h1>
          <p className='text-xs text-slate-500'>경기도 지역화폐 가맹점 현황</p>
        </div>
        <div className='h-[70vh]'>
          <div className="text-center">
            <div className="mt-1 h-[100vh]">
              <MapView 
                selectedSpot={selectedSpot}
                spots={spotsToShow}
              />
            </div>
          </div>
        </div>
      </section>
      
      <aside className='border rounded-2xl bg-white shadow-sm'>
        <div className='border-b px-4 py-3'>
          <h2 className='text-base font-semibold'>Gyeonggi Gmoney Spot</h2>
          <p className='mt-1 text-xs text-slate-500'>
            데이터: {wifiData?.length?.toLocaleString()}건 / 표시: {filtered.length}건
          </p>
        </div>
        <div className='flex gap-2 border-b px-4 py-3'>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className='flex-3 border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/20 rounded-lg'
            type="text" placeholder='장소 주소 검색' />
          <button className='flex-1 bg-slate-900 rounded-lg px-3 py-2 text-white font-medium'>
            검색
          </button>
        </div>
        <ul className='max-h-[60vh] overflow-auto p-2 space-y-2'>
          {filtered.map((item, idx) => (
            <li
              key={idx}
              // 기존 setSelectedSpot(item)을 직접 호출하던 것을 변경
              onClick={() => handleSelectSpot(item)}
              className={`rounded-xl p-3 hover:bg-slate-50 cursor-pointer border-2
              ${
               selectedSpot?.name === item.name && 
               selectedSpot?.detail === item.detail && 
               selectedSpot?.phone === item.phone ?

              
              'border-slate-900 bg-slate-50':'border-transparent'}`}>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <div className='text-sm font-semibold'>{item.name}</div>
                  <div className='mt-1 text-xs text-slate-500'>
                    {item.detail}
                  </div>
                </div>
                <span className='rounded bg-slate-100 px-2 py-1 text-xs text-slate-600'>
                  {item.phone}
                </span>
                <span
                  onClick={(e)=>{e.stopPropagation(); toggle(item)}}
                  className='cursor-pointer select-none text-lg'
                  role='button'
                  aria-label={isFavorite(item)? '즐겨찾기 해제':'즐겨찾기 추가'}>
                  {isFavorite(item)? '❤' : '♡'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default MapPage