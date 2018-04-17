function getMonth(){
  let cal = new Date()

  console.log('util', (cal.getMonth()+1).toString())

  return (cal.getMonth()+1).toString().length === 1 ? '0'+(cal.getMonth()+1).toString() : (cal.getMonth()+1).toString()
}
