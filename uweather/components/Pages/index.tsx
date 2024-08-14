import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={"وضعیت اب و هوا"} style={{ minHeight: 100, margin: 20, width: "calc(100% - 20px)" }}>

      <div style={{width:"100%", height:100, backgroundColor:"device-cmyk(0.73 0 0.1 0.51)", borderRadius:10, textAlign:"center"}}>
        
          current air temperature(C): {(props.p.FeelsLikeC as number)}
        
          
        </div>

        <div style={{width:"100%", height:100, backgroundColor:"hsl(245.24 49.61% 50.2%)", borderRadius:10, textAlign:"center"}}>
        
        humidity of air: {(props.p.humidity as number)}
      
        
      </div>

      <div style={{width:"100%", height:100, backgroundColor:"hwb(83.76 54.51% 5.88%)", borderRadius:10, textAlign:"center"}}>
        
          current air pressure: {(props.p.pressure as number)}
        
          
        </div>



        <div style={{width:"100%", height:100, backgroundColor:"hwb(245 76.08% 19.22%)0.46)", borderRadius:10, textAlign:"center"}}>
        
        current air speed: {(props.p.windspeedKmph as number)}
      
        
      </div>


      <div style={{width:"100%", height:100, backgroundColor:"lab(56.57 -5.99 -2.09)", borderRadius:10, textAlign:"center"}}>
        
          average temp(c):{props.d}
        
          
        </div>


        <div style={{width:"100%", height:100, backgroundColor:"lab(70.03 12.31 -28.98)", borderRadius:10, textAlign:"center"}}>
        
        country: {(props.b as string)}
          
          <br-x />
          <br-x />
          <br-x />
          <br-x />
          
      
          city: {(props.c as string)}
          <br-x />
          <br-x />

          current time: {(props.q as number)}
        
          
        </div>











        <center style={{fontSize:10}}>
          rutherford group from turing team
        </center>

      
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let res = await fetch("https://irmapserver.ir/research/api/weather/")
    let data = await res.json()
    let p = data.current_condition[0]
    let q = data.current_condition[0].localObsDateTime
    let b = data.nearest_area[0].country[0].value
    let c = data.nearest_area[0].areaName[0].value
    let d = data.weather[0].avgtempC
  return {
    props: {
      data: global.QSON.stringify({
        p,
        q,
        b,
        c,
        d,
        session,
        // nlangs,
      })
    },
  }
}