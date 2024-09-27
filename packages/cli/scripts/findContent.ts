import jayson from 'jayson/promise/index.js'

import type { HttpClient } from 'jayson/promise/index.js'

// Optimistic update for signature_slot 6718464
const contentKey = '0x130084660000000000'
const content =
  '0xbba4da96ac000000ffffffffffffffffffffffffffffbfffff7fffffffffffffffffffffffffffffffffffffffffffffffffffdefffffffffffffffffffeffffffffffffffffefffa480f81d481c5aa8439f8c65f86c69d3b1570cfd95b61300f7e29c5b0954c0c0fb080bba0e8ba60dead40c45355332ed06982fcaf53ad1ad4a7e6e39091ee7e5602d4a30b6d46e12047c31451f246bf43c4a3fbdb1d1de2f2180a776ef71fc3d0084660000000000ff83660000000000e5f4020000000000007b8211614b9c5331a1de2691ad7cdde1ca113b4e51b9f2757a4b502833f9234a06eb807d82b9175dd085748ade76aaa86fb4eca48bc8deb01b9c56a267a896d98469820ef7d34f8610e134c6eaf8d379e83cf6c3ab0663fba828edab344dc5f40000008e2a532cfdfdce86b27b26f611f1df0e2b00a54d18c6980e69ad28a4b70bf480336488033fe5f3ef4ccc12af07b9370b92e553e35ecb4a337a1b1c0e4afe1e0edb56114e00fdd4c1f85c892bf35ac9a89289aaecb1ebd0a96cde606a748b5d71b4c4e01065cd22a0d2f27a544ff8315b9e28f6270a63f543831778f32648ac3a15ecbea44f91b9b4a28ec8308a30a4b6252f554a2088bb1c73ea01013ba4963dfeebabe6b0418ec13b30aadf129f5dcdd4f70ceaa56499df0b3ba9d8fe6ca410132a29cf387371294137003adb139ce9f06b6f7dbf32ee01da91016a485a8aab5669168efc3d3a200b2ee0f25d937a413dfc38e44e211f02432a01a83088e700808c302002139aad8496010300cd220b14288429d8a6049945000a3b60f00f00109019341a0129a08906314848650817002cb98894a328084521a87e6d0a64e8080004ac0805000800e29808294016508a2004001304002a02320c4705501ac008a62848701040012a08e5c8b69010f1009f80408894857053e1b940e2c9004912860e26112080610d002098242000ca001420209a42c141d0c86087509344ced8a32e0204410a0196025a12106104e20008ad4449d5043208090008810201820209108607a0fa1004aa323410050222867024e0d172a82821b02c00020513152006484c800b10f0420802c0244d0850288c6541dc34cabc32f5d355aef4017425cab95c1de0474d483623e23c9bf13d9a18f1597e930b010000000080c3c901000000000ca88800000000004b6094640000000038020000ab9bf66d04000000000000000000000000000000000000000000000000000000797be971185ac699fa7288c87457c3611b443fb98483fddf282dfa7c5b4b27058eddbcd8b5de9b747c57c827ceba820d19e987ff6740eed38ccbc947696d71e3e2c3b96c9200d7d5c66fb4e8458067d6420e64647682ca2f0798ae817d2bc19468747470733a2f2f6574682d6275696c6465722e636f6d'

const { Client } = jayson

const main = async () => {
  const ultralights: HttpClient[] = []
  const enrs: string[] = []
  const nodeIds: string[] = []
  for (let i = 0; i < 2; i++) {
    const ultralight = Client.http({ host: '0.0.0.0', port: 8545 + i })
    const ultralightENR = await ultralight.request('discv5_nodeInfo', [])
    console.log(ultralightENR)
    ultralights.push(ultralight)
    enrs.push(ultralightENR.result.enr)
    nodeIds.push(ultralightENR.result.nodeId)
  }

  const gossip = await ultralights[0].request('portal_beaconStore', [contentKey, content])
  console.log(gossip.result)
  await new Promise((res) => {
    setTimeout(res, 1000)
  })
  const stored = await ultralights[0].request('portal_beaconLocalContent', [contentKey])
  console.log(stored.result)

  const gossipBody = await ultralights[1].request('portal_beaconFindContent', [enrs[0], contentKey])
  console.log(gossipBody)
  await new Promise((res) => {
    setTimeout(res, 1000)
  })
  const storedBody = await ultralights[1].request('portal_beaconLocalContent', [contentKey])

  console.log('storedContent', storedBody.result)
}

void main()
