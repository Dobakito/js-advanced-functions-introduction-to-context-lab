// Your code here
const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (records) => {
  return records.map( item => createEmployeeRecord(item))
}

function createTimeInEvent(record, time){
  record.timeInEvents.push({
      type: "TimeIn",
      date: time.split(' ')[0],
      hour: parseInt(time.split(' ')[1], 10)
  })
  return record
}

function createTimeOutEvent(record, time){
  record.timeOutEvents.push({
      type: "TimeOut",
      date: time.split(' ')[0],
      hour: parseInt(time.split(' ')[1], 10)
  })
  return record
}

const hoursWorkedOnDate = (record, date) => {
  let timeIn = record.timeInEvents.find( i => i.date === date)
  let timeOut = record.timeOutEvents.find( i => i.date === date)
  let hours = (timeOut.hour - timeIn.hour) / 100;
  return hours
}
const wagesEarnedOnDate = (record, date) => {
    let hours = hoursWorkedOnDate(record, date)
    return hours * record.payPerHour
}

function allWagesFor(records){
  let pay = records.timeInEvents.map(record => wagesEarnedOnDate(records, record.date))
  return pay.reduce((p, total) => p + total)
}

function calculatePayroll(employees){
  let payroll = employees.map( employee => allWagesFor(employee))
  return payroll.reduce((p, total) => p + total)
}

const findEmployeeByFirstName = (records, name) => {
  return records.find(record => record.firstName === name)
}
