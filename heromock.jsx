// heromock.jsx — Getaround-style hero: phone mockup + stacked white search
// Globals used: React, Icon (icons.jsx), AgencyField/DateField (widget.jsx), IOSDevice (ios-frame.jsx)

/* ---------- PHONE MOCKUP (map + car card) ---------- */
function PhoneMock() {
  const pins = [
    { top: "20%", left: "22%" }, { top: "30%", left: "62%" }, { top: "44%", left: "30%" },
    { top: "54%", left: "70%" }, { top: "64%", left: "40%" }, { top: "26%", left: "82%" },
    { top: "72%", left: "20%" },
  ];
  return (
    <div className="phone-wrap">
      <IOSDevice width={328} height={662}>
        <div className="pm-screen">
          <div className="pm-topbar">
            <span className="pm-pill"><Icon name="pin" size={14}/> Position actuelle</span>
            <span className="pm-pill"><Icon name="calendar" size={14}/> Aujourd'hui</span>
          </div>
          <div className="pm-map">
            <svg className="streets" viewBox="0 0 320 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="320" height="360" fill="#E7ECF1"/>
              <g stroke="#D2DAE2" strokeWidth="9" fill="none">
                <path d="M-20 70 H360"/><path d="M-20 180 H360"/><path d="M-20 290 H360"/>
                <path d="M70 -20 V380"/><path d="M180 -20 V380"/><path d="M270 -20 V380"/>
              </g>
              <g stroke="#CBD5DF" strokeWidth="4" fill="none">
                <path d="M-20 125 H360"/><path d="M-20 235 H360"/>
                <path d="M120 -20 V380"/><path d="M225 -20 V380"/>
              </g>
              <path d="M-20 70 L180 180 L360 290" stroke="#BFD3C7" strokeWidth="12" fill="none" opacity="0.7"/>
              <rect x="200" y="40" width="90" height="60" rx="8" fill="#DCE7DE" opacity="0.7"/>
              <rect x="20" y="210" width="70" height="70" rx="8" fill="#DCE7DE" opacity="0.6"/>
            </svg>
            {pins.map((p,i)=><span className="pm-pin" key={i} style={p}></span>)}
            <span className="pm-price">59€<em>POUR 1 JOUR</em></span>
          </div>
          <div className="pm-card">
            <image-slot id="phone-car" placeholder="Photo véhicule" shape="rect"></image-slot>
            <div className="pm-card-body">
              <div>
                <b>Dacia Duster</b>
                <span className="pm-stars">
                  {Array.from({length:5}).map((_,i)=><Icon key={i} name="star" size={12} fill/>)}
                </span>
              </div>
              <span className="pm-arrow"><Icon name="arrowR" size={18}/></span>
            </div>
          </div>
        </div>
      </IOSDevice>
    </div>
  );
}

/* ---------- HERO SEARCH (white stacked pills) ---------- */
function HeroSearch({ state, set, onSearch, variant }) {
  if (variant === "bar") {
    return (
      <div className="hero-search hs-bar">
        <AgencyField label="Départ" value={state.pickup} onChange={v=>set({pickup:v, dropoff:v})}/>
        <DateField label="Dates" start={state.start} end={state.end} onChange={(s,e)=>set({start:s,end:e})}/>
        <button className="btn-search" onClick={onSearch}>
          <Icon name="arrowR" size={18}/>
        </button>
      </div>
    );
  }
  if (variant === "min") {
    return (
      <div className="hero-search hs-min">
        <AgencyField label="Où récupérer le véhicule ?" value={state.pickup} onChange={v=>set({pickup:v, dropoff:v})}/>
        <button className="btn-search" onClick={onSearch}>
          Voir les véhicules disponibles <Icon name="arrowR" size={17}/>
        </button>
      </div>
    );
  }
  // default: card (Getaround-like stacked)
  return (
    <div className="hero-search">
      <AgencyField label="Agence de départ" value={state.pickup} onChange={v=>set({pickup:v, dropoff:v})}/>
      <div className="hs-row">
        <DateField label="Début" start={state.start} end={state.start} single onChange={(s)=>set({start:s})}/>
        <DateField label="Fin" start={state.end} end={state.end} single onChange={(s)=>set({end:s})}/>
      </div>
      <button className="btn-search" onClick={onSearch}>
        Rechercher les véhicules <Icon name="arrowR" size={17}/>
      </button>
    </div>
  );
}

Object.assign(window, { PhoneMock, HeroSearch });
