import React , {useEffect , useState} from 'react'

function HomePage() {

    useEffect(() => {
        fetch('https://data.cityofnewyork.us/resource/tvpp-9vvx.json')
        .then(resp => resp.json())
        .then(data => console.log(data))
    })

  return (
    <div>

    </div>
  )
}

export default HomePage