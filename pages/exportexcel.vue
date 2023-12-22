<template>
    <div ref="pdfContent">
        <v-card-actions class="expandable-row py-0">
            <v-col class="py-0 pl-0">
                <v-card outlined style="background-color: #ffff00" class="table-hiegth text-center">
                    <v-card-text v-if="loading" class="pa-0">
                        <v-progress-linear indeterminate color="#4d3d00"></v-progress-linear>
                    </v-card-text>
                    <v-data-table v-if="!overlay" dense :headers="visibleHeaders" :items="visibleItems"
                        :items-per-page="getItemsPerPage" item-key="name" class="elevation-1 ma-1  px-4">
                    </v-data-table>
                </v-card>
            </v-col>
        </v-card-actions>
    </div>
</template>
<script>
export default {
    Currency: 'DefaultLayout',
    data() {
        return {
            desserts: [],
            columns: [
                { key: 'TICKETID', title: 'TICKETID', active: true },
                { key: 'CLASSIFICATION', title: 'CLASSIFICATION', active: true },
                { key: 'MSISDN', title: 'MSISDN', active: true },
                { key: 'SERVICE_GROUP', title: 'SERVICE_GROUP', active: true },
                { key: 'COMMODITY', title: 'COMMODITY', active: true },
                { key: 'CREATED__BY', title: 'CREATEDBY', active: true },
                { key: 'CREATIONDATE', title: 'CREATIONDATE', active: true },
                { key: 'QUEUED_DATE', title: 'QUEUED_DATE', active: true },
                { key: 'QUEUED_OWNERGROUP', title: 'QUEUED_OWNERGROUP', active: true },
                { key: 'INPROGRESS_DATE', title: 'INPROGRESS_DATE', active: true },
                { key: 'INPROGRESS_OWNER', title: 'INPROGRESS_OWNER', active: true },
                {
                    key: 'INPROGRESS_OWNERGROUP',
                    title: 'INPROGRESS_OWNERGROUP',
                    active: true,
                },
                {
                    key: 'INPROGRESS_CHANGBY',
                    title: 'INPROGRESS_CHANGBY',
                    active: true,
                },
                { key: 'RESOLVE_DATE', title: 'RESOLVE_DATE', active: true },
                { key: 'RESOLVE_OWNER', title: 'RESOLVE_OWNER', active: true },
                {
                    key: 'RESOLVE_OWNERGROUP',
                    title: 'RESOLVE_OWNERGROUP',
                    active: true,
                },
                { key: 'RESOLVE_CHANGBY', title: 'RESOLVE_CHANGBY', active: true },
                { key: 'TIME_CARE_TPLUS', title: 'TIME_CARE_TPLUS', active: true },
                { key: 'TIME_DO_TPLUS', title: 'TIME_DO_TPLUS', active: true },
                {
                    key: 'WORKLONG_DESCRIPTOIN',
                    title: 'WORKLONG_DESCRIPTOIN',
                    active: true,
                },
                { key: 'MODIFY_DATE', title: 'MODIFY_DATE', active: true },
                { key: 'MODIFY__BY', title: 'MODIFYBY', active: true },
                { key: 'PROVINCE', title: 'PROVINCE', active: true },
                { key: 'DISTRICT', title: 'DISTRICT', active: true },
                { key: 'VILLAGE', title: 'VILLAGE', active: true },
                { key: 'COMPLAIN_BY', title: 'COMPLAIN_BY', active: true },
                { key: 'CLOSE_DATE', title: 'CLOSE_DATE', active: true },
                { key: 'CLOSE__BY', title: 'CLOSE_BY', active: true },
                { key: 'STATUS_TICKET', title: 'STATUS_TICKET', active: true },
                {
                    key: 'TIME_CLOSE_BY_CENTER',
                    title: 'TIME_CLOSE_BY_CENTER',
                    active: true,
                },
            ],
            headers: [
                {
                    text: 'TICKETID',
                    align: 'start',
                    sortable: false,
                    value: 'TICKETID',
                },
                { text: 'CLASSIFICATION', value: 'CLASSIFICATION' },
                { text: 'MSISDN', value: 'MSISDN' },
                { text: 'SERVICE_GROUP', value: 'SERVICE_GROUP' },
                { text: 'CREATED__BY', value: 'CREATEDBY' },
                { text: 'COMMODITY', value: 'COMMODITY' },
                { text: 'CREATIONDATE', value: 'CREATIONDATE' },
                { text: 'QUEUED_DATE', value: 'QUEUED_DATE' },
                { text: 'QUEUED_OWNERGROUP', value: 'QUEUED_OWNERGROUP' },
                { text: 'INPROGRESS_DATE', value: 'INPROGRESS_DATE' },
                { text: 'INPROGRESS_OWNER', value: 'INPROGRESS_OWNER' },
                { text: 'INPROGRESS_OWNERGROUP', value: 'INPROGRESS_OWNERGROUP' },
                { text: 'INPROGRESS_CHANGBY', value: 'INPROGRESS_CHANGBY' },
                { text: 'RESOLVE_DATE', value: 'RESOLVE_DATE' },
                { text: 'RESOLVE_OWNER', value: 'RESOLVE_OWNER' },
                { text: 'RESOLVE_OWNERGROUP', value: 'RESOLVE_OWNERGROUP' },
                { text: 'RESOLVE_CHANGBY', value: 'RESOLVE_CHANGBY' },
                { text: 'TIME_CARE_TPLUS', value: 'TIME_CARE_TPLUS' },
                { text: 'TIME_DO_TPLUS', value: 'TIME_DO_TPLUS' },
                { text: 'WORKLONG_DESCRIPTOIN', value: 'WORKLONG_DESCRIPTOIN' },
                { text: 'MODIFY_DATE', value: 'MODIFY_DATE' },
                { text: 'MODIFY__BY', value: 'MODIFYBY' },
                { text: 'PROVINCE', value: 'PROVINCE' },
                { text: 'DISTRICT', value: 'DISTRICT' },
                { text: 'VILLAGE', value: 'VILLAGE' },
                { text: 'COMPLAIN_BY', value: 'COMPLAIN_BY' },
                { text: 'CLOSE_DATE', value: 'CLOSE_DATE' },
                { text: 'CLOSE__BY', value: 'CLOSE_BY' },
                { text: 'STATUS_TICKET', value: 'STATUS_TICKET' },
                { text: 'TIME_CLOSE_BY_CENTER', value: 'TIME_CLOSE_BY_CENTER' },
            ],
            date: new Date(
                Date.now() -
                144 * 60 * 60 * 1000 -
                new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .substr(0, 10), // + 'T00:00:00.000Z',
            menu: false,
            dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10), // + 'T00:00:00.000Z',
            menus: false,
            dateshow: true,
            // r:[],
        }
    },
    computed: {
        visibleHeaders() {
            return this.headers.filter((header) => {
                const column = this.columns.find((col) => col.key === header.value)
                return column ? column.active : false
            })
        },
        visibleItems() {
            return this.desserts.map((item) => {
                const newItem = { ...item }
                this.columns.forEach((col) => {
                    if (!col.active) {
                        newItem[col.key] = undefined
                    }
                })
                return newItem
            })
        },
        getItemsPerPage() {
            return this.desserts.length;
        },
    },

    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            this.loading = true
            try {
                const startDate = this.date
                const endDate = this.dates

                const res = await this.$axios.$get(
                    `http://172.28.26.23:3000/ticket?startDate=${encodeURIComponent(
                        startDate
                    )}&endDate=${encodeURIComponent(endDate)}`
                )

                // --------- loop data in lastindex of Object in group ID
                const lastIndexes = {}
                const firstIndexes = {}
                const resolvebyIndex = {}
                const indateIndex = {}
                const inownerIndex = {}

                for (let i = res.length - 1; i >= 0; i--) {
                    const currentTicketID = res[i].TICKETID

                    if (typeof inownerIndex[currentTicketID] === 'undefined') {
                        inownerIndex[currentTicketID] = i - 3
                    }
                }

                for (let i = res.length - 1; i >= 0; i--) {
                    const currentTicketID = res[i].TICKETID

                    if (typeof lastIndexes[currentTicketID] === 'undefined') {
                        lastIndexes[currentTicketID] = i
                    }
                }

                for (let i = res.length - 1; i >= 0; i--) {
                    const currentTicketID = res[i].TICKETID

                    if (typeof indateIndex[currentTicketID] === 'undefined') {
                        indateIndex[currentTicketID] = i - 2
                    }
                }

                for (let i = res.length - 1; i >= 0; i--) {
                    const currentTicketID = res[i].TICKETID

                    if (typeof resolvebyIndex[currentTicketID] === 'undefined') {
                        resolvebyIndex[currentTicketID] = i - 1
                    }
                }

                for (let i = 0; i < res.length; i++) {
                    const currentTicketID = res[i].TICKETID
                    if (typeof firstIndexes[currentTicketID] === 'undefined') {
                        firstIndexes[currentTicketID] = i
                    }
                }

                // --------- last  data in lastindex of Object in group ID

                const desserts = Object.values(firstIndexes).map((firstIndex) => {
                    // ---------------- fech data in desserts
                    const firstItem = res[firstIndex]
                    const lastItemIndex = lastIndexes[firstItem.TICKETID]
                    const lastItem = res[lastItemIndex]
                    const resolveItemIndex = resolvebyIndex[firstItem.TICKETID]
                    const resolveItem =
                        resolveItemIndex !== undefined ? res[resolveItemIndex] : null
                    const inprogressItemIndex = indateIndex[firstItem.TICKETID]
                    const inprogressItem = //  -2
                        inprogressItemIndex !== undefined ? res[inprogressItemIndex] : null
                    const inownerItemIndex = inownerIndex[firstItem.TICKETID]
                    const inownerItem =
                        inownerItemIndex !== undefined ? res[inownerItemIndex] : null

                    function convertToISOFormat(dateString) {
                        if (!dateString) {
                            return null // or handle the case where dateString is undefined
                        }

                        const dateParts = dateString.split(' ')

                        if (dateParts.length !== 2) {
                            return null // or handle the case where the expected format is not found
                        }

                        const [day, month, year] = dateParts[0].split('-')
                        const [hours, minutes, seconds] = dateParts[1].split(':')

                        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
                    }
                    const date1 = new Date(convertToISOFormat(inprogressItem.QUEUED_DATE))
                    const date2 = new Date(convertToISOFormat(firstItem.QUEUED_DATE))
                    const date3 = new Date(convertToISOFormat(resolveItem.QUEUED_DATE))
                    const date4 = new Date(convertToISOFormat(lastItem.QUEUED_DATE))
                    console.log('d1', date3)
                    console.log(resolveItem.QUEUED_DATE)
                    console.log('d2', date2)
                    console.log(firstItem.QUEUED_DATE)

                    // const time  care  tplus = resolvedateValue.getDate() - qeuredateValue.getDate()

                    const timecare = date1 - date2
                    const hours = Math.floor(timecare / (1000 * 60 * 60))
                    const minutes = Math.floor(
                        (timecare % (1000 * 60 * 60)) / (1000 * 60)
                    )
                    const timecaretplus = (timecare, hours, minutes)
                    // --------------------------------
                    // const timedotplus = resolvedateValue.getDate() - qeuredateValue.getDate()
                    const timedo = date3 - date2
                    const hoursdo = Math.floor(timedo / (1000 * 60 * 60))
                    const minutesdo = Math.floor(
                        (timedo % (1000 * 60 * 60)) / (1000 * 60)
                    )
                    const timedotplus = (timedo, hoursdo, minutesdo)
                    console.log('tic', timedotplus)
                    // --------------------------------

                    const timecenter = date4 - date3
                    const hourscenter = Math.floor(timecenter / (1000 * 60 * 60))
                    const minutescenter = Math.floor(
                        (timecenter % (1000 * 60 * 60)) / (1000 * 60)
                    )
                    const timecolsebycenter = (timecenter, hourscenter, minutescenter)
                    //  data in desertes
                    return {
                        TICKETID: firstItem.TICKETID,
                        CLASSIFICATION: firstItem.CLASSIFICATION,
                        MSISDN: firstItem.MSISDN,
                        SERVICE_GROUP: firstItem.SERVICE_GROUP,
                        COMMODITY: firstItem.COMMODITY,
                        CREATEDBY: firstItem.CREATEDBY,
                        CREATIONDATE: firstItem.CREATIONDATE,
                        QUEUED_DATE: firstItem.QUEUED_DATE,
                        QUEUED_OWNERGROUP: firstItem.OWNERGROUP,
                        INPROGRESS_DATE: inprogressItem.QUEUED_DATE,
                        INPROGRESS_OWNER: inownerItem.QUEUED_OWNER,
                        INPROGRESS_OWNERGROUP: firstItem.OWNERGROUP,
                        INPROGRESS_CHANGBY: inownerItem.INPROGRESS_CHANGEBY,
                        RESOLVE_DATE: resolveItem.QUEUED_DATE,
                        RESOLVE_OWNER: inprogressItem.QUEUED_OWNER,
                        RESOLVE_OWNERGROUP: inprogressItem.OWNERGROUP,
                        RESOLVE_CHANGBY: inprogressItem.INPROGRESS_CHANGEBY,
                        TIME_CARE_TPLUS: timecaretplus, // inprogressdateValue - qeuredateValue
                        TIME_DO_TPLUS: timedotplus, // resolvedateValue - qeuredateValue
                        WORKLONG_DESCRIPTOIN: firstItem.FIRST_WORKLOG_DESCRIPTION,
                        MODIFY_DATE: resolveItem.QUEUED_DATE,
                        MODIFYBY: firstItem.FIRST_WORKLOG_MODIFYBY,
                        PROVINCE: firstItem.PROVINCE,
                        DISTRICT: firstItem.DISTRICT,
                        VILLAGE: firstItem.VILLAGE,
                        COMPLAIN_BY: firstItem.COMPLAIN_BY,
                        CLOSE_DATE: lastItem.QUEUED_DATE,
                        CLOSE_BY: lastItem.INPROGRESS_CHANGEBY,
                        STATUS_TICKET: lastItem.STATUS,
                        TIME_CLOSE_BY_CENTER: timecolsebycenter, // colsedateValue - resolvedateValue
                    }
                })

                // console.log(desserts)

                this.desserts = desserts
            } catch (error) {
                console.error('Error fetching data:', error)
                // Handle errors as needed, e.g., show an error message to the user
            }
            this.loading = false
            // }
            // else {
            //   console.log("hi")
            // }
        },
    },

}
</script>
<style>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
}

/* .table-container {
    max-height: 450px;
    overflow-y: auto;
  } */
.table-container ::-webkit-scrollbar {
    width: 2px;
}

.table-container ::-webkit-scrollbar-thumb {
    background-color: #ffff00;
    border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
    background-color: #ffff00;
    border-radius: 4px;
}

.resizable {
    cursor: ew-resize;
}

.table-hiegth {
    max-height: 474px;
    overflow-y: auto;
}

.table-title-hiegth {
    max-height: 400px;
    overflow-y: auto;
}
</style>
    