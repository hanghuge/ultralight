import { Button, ButtonGroup } from '@chakra-ui/react'
import React from 'react'
import { Dispatch, SetStateAction } from 'react'

interface BootnodeProps {
  setPeerEnr: Dispatch<SetStateAction<string>>
  handleClick: () => Promise<void>
}

export default function Bootnode(props: BootnodeProps) {
  const bns = {
    'Ultralight Bootnodes': [
      'enr:-IS4QG_M1lzTXzQQhUcAViqK-WQKtBgES3IEdQIBbH6tlx3Zb-jCFfS1p_c8Xq0Iie_xT9cHluSyZl0TNCWGlUlRyWcFgmlkgnY0gmlwhKRc9EGJc2VjcDI1NmsxoQMo1NBoJfVY367ZHKA-UBgOE--U7sffGf5NBsNSVG629oN1ZHCCF6Q',
      'enr:-IS4QNxXp3t9TUUQCK39l1OYBYYkXoEF2ojj9bPmWqpKsSbIfw1dbsisOt9SYDD0qwNKZZ1_qWDEeEH5lo85gq-JOhEFgmlkgnY0gmlwhKRc9EGJc2VjcDI1NmsxoQKKnSTsqwcBYg1atI7dlanT8Mo29std_701sLx0g09yXYN1ZHCCF6Y',
      'enr:-IS4QD-qmTd6jsWvntSnVvqj1vK2qp8Vb-G56era8b4h_uKaRsWxTflX8-6RAaKTZKG0-obOoeHui7bFOH7LpjAdGaQFgmlkgnY0gmlwhKRc9EGJc2VjcDI1NmsxoQIHi6O5zgq55hbKqgVYsuwZNOL1nz6h4sUDCY0UEIhKEIN1ZHCCF6I',
    ],
    'Trin Bootnodes': [
      'enr:-IS4QJBALBigZVoKyz-NDBV8z34-pkVHU9yMxa6qXEqhCKYxOs5Psw6r5ueFOnBDOjsmgMGpC3Qjyr41By34wab1sKIBgmlkgnY0gmlwhKEjVaWJc2VjcDI1NmsxoQOSGugH1jSdiE_fRK1FIBe9oLxaWH8D_7xXSnaOVBe-SYN1ZHCCIyg',
      'enr:-IS4QFm4gtstCnRtOC-MST-8AFO-eUhoNyM0u1XbXNlr4wl1O_rGr6y7zOrS3SIZrPDAge_ijFZ4e2B9eZVHhmgJtg8BgmlkgnY0gmlwhM69ZOyJc2VjcDI1NmsxoQLaI-m2CDIjpwcnUf1ESspvOctJLpIrLA8AZ4zbo_1bFIN1ZHCCIyg',
      'enr:-IS4QBE8rpfrvCZVf0RISINpHU4GM-ZmkX4y3h_WxF7YflJ-dh88a6q9_42mGVSAetfpOQqujnPE-BkDWss5qF6d45UBgmlkgnY0gmlwhJ_fCDaJc2VjcDI1NmsxoQN9rahqamBOJfj4u6yssJQJ1-EZoyAw-7HIgp1FwNUdnoN1ZHCCIyg',
    ],
    'Fluffy Bootnodes': [
      'enr:-IS4QGeTMHteRmm-MSYniUd48OZ1M7RMUsIjnSP_TRbo-goQZAdYuqY2PyNJfDJQBz33kv16k7WB3bZnBK-O1DagvJIBgmlkgnY0gmlwhEFsKgOJc2VjcDI1NmsxoQIQXNgOCBNyoXz_7XP4Vm7pIB1Lp35d67BbC4iSlrrcJoN1ZHCCI40',
      'enr:-IS4QOA4voX3J7-R_x8pjlaxBTpT1S_CL7ZaNjetjZ-0nnr2VaP0wEZsT2KvjA5UWc8vi9I0XvNSd1bjU0GXUjlt7J0BgmlkgnY0gmlwhEFsKgOJc2VjcDI1NmsxoQI7aL5dFuHhwbxWD-C1yWH7UPlae5wuV_3WbPylCBwPboN1ZHCCI44',
      'enr:-IS4QFzPZ7Cc7BGYSQBlWdkPyep8XASIVlviHbi-ZzcCdvkcE382unsRq8Tb_dYQFNZFWLqhJsJljdgJ7WtWP830Gq0BgmlkgnY0gmlwhEFsKq6Jc2VjcDI1NmsxoQPjz2Y1Hsa0edvzvn6-OADS3re-FOkSiJSmBB7DVrsAXIN1ZHCCI40',
      'enr:-IS4QHA1PJCdmESyKkQsBmMUhSkRDgwKjwTtPZYMcbMiqCb8I1Xt-Xyh9Nj0yWeIN4S3sOpP9nxI6qCCR1Nf4LjY0IABgmlkgnY0gmlwhEFsKq6Jc2VjcDI1NmsxoQLMWRNAgXVdGc0Ij9RZCPsIyrrL67eYfE9PPwqwRvmZooN1ZHCCI44',
    ],
  }

  const bootnodes: Record<string, string> = {
    Fluffy01:
      'enr:-IS4QGeTMHteRmm-MSYniUd48OZ1M7RMUsIjnSP_TRbo-goQZAdYuqY2PyNJfDJQBz33kv16k7WB3bZnBK-O1DagvJIBgmlkgnY0gmlwhEFsKgOJc2VjcDI1NmsxoQIQXNgOCBNyoXz_7XP4Vm7pIB1Lp35d67BbC4iSlrrcJoN1ZHCCI40',
    Fluffy02:
      'enr:-IS4QOA4voX3J7-R_x8pjlaxBTpT1S_CL7ZaNjetjZ-0nnr2VaP0wEZsT2KvjA5UWc8vi9I0XvNSd1bjU0GXUjlt7J0BgmlkgnY0gmlwhEFsKgOJc2VjcDI1NmsxoQI7aL5dFuHhwbxWD-C1yWH7UPlae5wuV_3WbPylCBwPboN1ZHCCI44',
    Fluffy03:
      'enr:-IS4QFzPZ7Cc7BGYSQBlWdkPyep8XASIVlviHbi-ZzcCdvkcE382unsRq8Tb_dYQFNZFWLqhJsJljdgJ7WtWP830Gq0BgmlkgnY0gmlwhEFsKq6Jc2VjcDI1NmsxoQPjz2Y1Hsa0edvzvn6-OADS3re-FOkSiJSmBB7DVrsAXIN1ZHCCI40',
    Fluffy04:
      'enr:-IS4QHA1PJCdmESyKkQsBmMUhSkRDgwKjwTtPZYMcbMiqCb8I1Xt-Xyh9Nj0yWeIN4S3sOpP9nxI6qCCR1Nf4LjY0IABgmlkgnY0gmlwhEFsKq6Jc2VjcDI1NmsxoQLMWRNAgXVdGc0Ij9RZCPsIyrrL67eYfE9PPwqwRvmZooN1ZHCCI44',
  }

  return (
    <ButtonGroup justifyContent={'space-around'}>
      {Object.entries(bootnodes).map(([name, enr]) => {
        return (
          <Button
            key={name}
            size={'md'}
            onMouseDown={() => props.setPeerEnr(enr)}
            onMouseUp={() => props.handleClick()}
          >
            {name}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
