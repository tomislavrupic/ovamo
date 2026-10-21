// Original, lightweight SVG packaging illustrations for fictional demo products.
// Deliberately decorative: the product name and price remain real HTML text.
const plum = '#342638';
const cream = '#FFF5E7';
const coral = '#F47850';

const drawings = {
  can: `<ellipse cx="112" cy="232" rx="45" ry="8" fill="${plum}" opacity=".09"/>
    <g transform="rotate(-8 110 130)"><rect x="72" y="40" width="78" height="184" rx="15" fill="${cream}"/>
    <rect x="72" y="64" width="78" height="139" fill="${coral}"/>
    <ellipse cx="111" cy="42" rx="35" ry="7" fill="#D9D0C6"/><ellipse cx="111" cy="42" rx="27" ry="3" fill="#B9B1A9"/>
    <path d="M104 40h14v4h-14z" fill="${plum}" opacity=".4"/>
    <text x="111" y="92" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-weight="900" font-size="18" letter-spacing="-1">ovamo</text>
    <circle cx="111" cy="145" r="26" fill="#F4B659"/><circle cx="111" cy="145" r="19" fill="#FFE5A2"/>
    <path d="M111 126v38m-19-19h38m-32-13 26 26m-26 0 26-26" stroke="#F4B659" stroke-width="2"/>
    <path d="M111 117q5-16 20-13-4 15-20 13" fill="#637A4B"/>
    <text x="111" y="188" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-size="7" letter-spacing="1.5">MANDARINA</text></g>`,
  bottle: `<ellipse cx="111" cy="235" rx="38" ry="7" fill="${plum}" opacity=".08"/>
    <g transform="rotate(7 110 135)"><rect x="95" y="24" width="32" height="23" rx="5" fill="${plum}"/>
    <path d="M96 45h30v26c0 15 23 24 23 43v100q0 17-18 17H91q-18 0-18-17V114c0-19 23-28 23-43Z" fill="#668367"/>
    <path d="M101 52v23c0 17-21 26-21 41v90" fill="none" stroke="#A4BD91" stroke-width="5" opacity=".5"/>
    <rect x="73" y="109" width="76" height="91" rx="2" fill="${cream}"/>
    <text x="111" y="132" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-weight="900" font-size="18" letter-spacing="-1">ovamo</text>
    <ellipse cx="111" cy="162" rx="22" ry="14" transform="rotate(-30 111 162)" fill="#E4C156"/>
    <path d="M116 147q10-21 22-14-3 17-22 14" fill="#668367"/>
    <text x="111" y="189" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-size="6" letter-spacing="1">LIMUN &amp; MENTA</text></g>`,
  chips: `<ellipse cx="111" cy="232" rx="60" ry="7" fill="${plum}" opacity=".08"/>
    <g transform="rotate(-5 110 130)"><path d="m57 42 10 4 10-4 10 4 10-4 10 4 10-4 10 4 10-4 10 4 10-4 7 4-8 43 11 132-10-4-10 4-10-4-10 4-10-4-10 4-10-4-10 4-10-4-10 4-8-4L65 86Z" fill="${cream}"/>
    <path d="M63 70h94l-4 27 7 94H63l7-94Z" fill="#D5A63F"/>
    <text x="111" y="102" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-weight="900" font-size="24" letter-spacing="-1.5">ovamo</text>
    <ellipse cx="100" cy="145" rx="22" ry="29" fill="#F6D777" transform="rotate(-27 100 145)"/>
    <ellipse cx="128" cy="153" rx="20" ry="27" fill="#FFE49B" transform="rotate(28 128 153)"/>
    <path d="m87 128 16 31m-9-34 16 31m9-23-12 33m20-29-12 33" stroke="#DEB450" stroke-width="2" opacity=".5"/>
    <text x="111" y="182" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-size="7" letter-spacing="1.5">MORSKA SOL</text></g>`,
  chocolate: `<ellipse cx="110" cy="232" rx="49" ry="8" fill="${plum}" opacity=".09"/>
    <g transform="rotate(12 110 130)"><rect x="65" y="34" width="91" height="192" rx="5" fill="#614136"/>
    <g fill="#805647" stroke="#4C342E" stroke-width="2"><rect x="73" y="42" width="33" height="32" rx="3"/><rect x="114" y="42" width="33" height="32" rx="3"/><rect x="73" y="82" width="33" height="32" rx="3"/><rect x="114" y="82" width="33" height="32" rx="3"/></g>
    <path d="m65 105 91 10v111H65Z" fill="#EBD3DF"/>
    <path d="m65 105 91 10v12l-91-9Z" fill="${cream}"/>
    <text x="110" y="153" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-weight="900" font-size="24" letter-spacing="-1.5">ovamo</text>
    <path d="M110 170q-28 19-4 28 23-3 4-28" fill="#B17C51"/><path d="m110 174-4 21" stroke="#D4A270" stroke-width="2"/>
    <text x="110" y="214" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-size="7" letter-spacing="1.3">MALI GUŠT</text></g>`,
  tote: `<ellipse cx="110" cy="233" rx="65" ry="8" fill="${plum}" opacity=".08"/>
    <g transform="rotate(-6 110 140)"><path d="M79 91V61c0-41 63-41 63 0v30" fill="none" stroke="#D2B18D" stroke-width="12"/>
    <path d="m48 83 125 0 9 141H39Z" fill="${cream}"/><path d="m52 88-8 130h132l-9-130" fill="none" stroke="#E2CCAC" stroke-width="2"/>
    <circle cx="138" cy="127" r="15" fill="${coral}"/><path d="m65 160 24-34 32 34 22-17 20 17" fill="#D8DABB"/>
    <path d="M61 166q15-9 30 0t30 0 30 0M61 177q15-9 30 0t30 0 30 0" fill="none" stroke="#759D9A" stroke-width="3"/>
    <text x="111" y="204" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-weight="900" font-size="22" letter-spacing="-1.5">ovamo</text></g>`,
  postcard: `<ellipse cx="110" cy="213" rx="71" ry="9" fill="${plum}" opacity=".08"/>
    <g transform="rotate(9 110 140)"><rect x="39" y="67" width="143" height="132" rx="3" fill="#F5D7B9"/></g>
    <g transform="rotate(-10 110 135)"><rect x="32" y="60" width="152" height="139" rx="3" fill="${cream}"/>
    <rect x="42" y="70" width="132" height="97" fill="#B8D9D5"/>
    <circle cx="141" cy="96" r="14" fill="${coral}"/><path d="m42 127 32-26 29 16 24 23 47-20v47H42Z" fill="#E5C9A3"/>
    <path d="M42 143q24-9 49 5t46-2 37-8v29H42Z" fill="#6F9F9E"/>
    <path d="M51 154q18-5 31 2m24 0q20 7 37-2" fill="none" stroke="${cream}" stroke-width="2"/>
    <text x="108" y="188" text-anchor="middle" fill="${plum}" font-family="Arial,sans-serif" font-weight="900" font-size="14" letter-spacing="-.6">o, dobar dan.</text></g>`,
  giftbox: `<ellipse cx="110" cy="226" rx="73" ry="9" fill="${plum}" opacity=".09"/>
    <g transform="rotate(-5 110 140)"><path d="m42 110 71-30 70 30-71 29Z" fill="#FFCFAD"/>
    <path d="M42 110v87l70 29v-87Z" fill="${coral}"/><path d="M112 139v87l71-29v-87Z" fill="#D76548"/>
    <path d="m33 100 80-33 79 33-80 33Z" fill="#F8AA86"/><path d="M33 100v17l79 32v-16Z" fill="#F1845D"/><path d="M112 133v16l80-32v-17Z" fill="#DA6B4E"/>
    <path d="m75 83 78 33v94l-19 8v-94L56 91Z" fill="${cream}"/><path d="m149 83-78 33v93l19 8v-93l78-33Z" fill="#EADFD1"/>
    <path d="M112 99c-57-2-49-51-21-35 12 7 21 35 21 35Zm0 0c49-15 55-52 25-40-14 6-25 40-25 40Z" fill="${cream}" stroke="#E7D9C9" stroke-width="2"/>
    <text x="62" y="161" fill="${plum}" font-family="Arial,sans-serif" font-weight="900" font-size="13" transform="rotate(23 62 161)" letter-spacing="-.7">ovamo</text></g>`,
  notebook: `<ellipse cx="111" cy="231" rx="57" ry="8" fill="${plum}" opacity=".08"/>
    <g transform="rotate(8 110 130)"><rect x="58" y="40" width="111" height="185" rx="7" fill="#D7C5B8"/><rect x="56" y="36" width="111" height="185" rx="7" fill="${cream}"/>
    <rect x="52" y="33" width="109" height="184" rx="7" fill="#A7718D"/><path d="M63 33v184" stroke="#7E506D" stroke-width="2"/>
    <rect x="77" y="69" width="67" height="105" rx="30" fill="#EAC5CF"/><circle cx="111" cy="105" r="18" fill="${coral}"/>
    <path d="M80 141q30-32 61 0v16H80Z" fill="${cream}"/>
    <path d="M88 151q12-8 24 0t23 0" fill="none" stroke="#A7718D" stroke-width="2"/>
    <text x="110" y="194" text-anchor="middle" fill="${cream}" font-family="Arial,sans-serif" font-weight="900" font-size="18" letter-spacing="-1">ovamo</text>
    <path d="M147 34v184" stroke="${plum}" stroke-width="4" opacity=".8"/></g>`,
};

// Neutral category silhouettes for third-party proposals: no invented packaging,
// logos, ingredients, or implied OVAMO manufacturing/endorsement.
const categoryDrawings = {
  can: `<ellipse cx="110" cy="232" rx="45" ry="8" fill="${plum}" opacity=".08"/><g transform="rotate(-7 110 130)"><rect x="72" y="40" width="76" height="184" rx="16" fill="${cream}" stroke="${plum}" stroke-width="2"/><path d="M73 76h74v109H73Z" fill="#D5C1AC"/><ellipse cx="110" cy="43" rx="32" ry="6" fill="#DDD5CA"/><path d="M102 41h16v4h-16" fill="none" stroke="${plum}" stroke-width="2"/><circle cx="110" cy="131" r="26" fill="${cream}"/><path d="m100 137 10-18 10 18Z" fill="none" stroke="${plum}" stroke-width="2"/></g>`,
  bottle: `<ellipse cx="110" cy="235" rx="38" ry="7" fill="${plum}" opacity=".08"/><g transform="rotate(6 110 135)"><rect x="96" y="24" width="28" height="21" rx="4" fill="${plum}"/><path d="M96 45h28v29c0 16 24 24 24 43v95q0 17-17 17H89q-17 0-17-17v-95c0-19 24-27 24-43Z" fill="#D0DEDA" stroke="${plum}" stroke-width="2"/><rect x="73" y="119" width="74" height="77" fill="${cream}"/><path d="M89 145h42m-42 12h42m-36 12h30" stroke="#6D8982" stroke-width="3"/><path d="M101 54v24c0 16-21 26-21 42" fill="none" stroke="white" stroke-width="4" opacity=".6"/></g>`,
  chips: `<ellipse cx="110" cy="232" rx="59" ry="7" fill="${plum}" opacity=".08"/><g transform="rotate(-5 110 130)"><path d="M58 42h104l-7 40 10 139H55L65 82Z" fill="#E9D4A9" stroke="${plum}" stroke-width="2"/><path d="M59 52h102M57 211h107" stroke="${plum}" stroke-width="2" opacity=".3"/><rect x="70" y="94" width="80" height="85" rx="40" fill="${cream}"/><path d="m90 143 20-22 20 22m-40 12h40" fill="none" stroke="#98784B" stroke-width="3"/></g>`,
  chocolate: `<ellipse cx="110" cy="232" rx="49" ry="8" fill="${plum}" opacity=".08"/><g transform="rotate(9 110 130)"><rect x="64" y="36" width="92" height="188" rx="5" fill="#8E737A" stroke="${plum}" stroke-width="2"/><path d="M65 49h90M65 211h90" stroke="${cream}" opacity=".5"/><rect x="77" y="91" width="66" height="87" rx="32" fill="${cream}"/><path d="M94 117h32v32H94Zm16 0v32m-16-16h32" fill="none" stroke="#72554E" stroke-width="2"/></g>`,
};

export function productIllustration(product) {
  const art = product.provenance === 'manufacturer' ? categoryDrawings : drawings;
  return `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${art[product.illustration] ?? drawings.giftbox}</svg>`;
}
