export default (target: any): boolean => {
  return [Object, Array].indexOf((
    typeof target == 'number' ? target : target || {}
  ).constructor) > -1 &&
  !Object.keys((target || {})).length
}