// export const state = () => ({
//   ID,
// })
// export const mutations = {
//   changeNameroot(ID) {
//     if (ID !== undefined && ID.indexOf('_') > 0 && ID.startsWith('TP')) {
//       const idToNameMap = {
//         TP01_: 'Number Was Barring in HSS',
//         TP02_: 'Number Was Operational',
//         TP03_: 'Number was Blacklist in OCS',
//         TP04_: 'Usage Up Package Already',
//         TP05_: 'High PRB',
//         TP06_: 'No Have 3G/4G Profile',
//         TP07_: 'Wrong Profile in SPNV',
//         TP08_: 'No Package',
//         TP09_: 'Number was suspended in OCS',
//         TP10_: 'Usage Old Beeline SIM',
//         TP21_: 'System Problem',
//         TP27_: ID,
//         TP32_: 'Weak Coverage Signal',
//         TP36_: 'Customer turn off Mobile',
//         TP56_: 'Customer turn off Mobile',
//         TP08_: 'No Package',
//         TP09_: 'Number was suspended in OCS',
//         TP16_: 'Usage Old Beeline SIM',
//         TP21_: 'System Problem',
//         TP27_: ID,
//         TP32_: 'Weak Coverage Signal',
//         TP36_: 'Customer turn off Mobile',
//         TP56_: 'Customer turn off Mobile',
//         // add more entries if needed
//       }
//       const name = idToNameMap[ID] || ID // use the mapped name or the original ID if not found
//       return name
//     } else {
//       return ID
//     }
//   },
// }
