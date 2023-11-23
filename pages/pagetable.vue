<template>
  <div>
    <v-card-title>
      <h3 style="color: #595959">Page Title</h3>
    </v-card-title>
    <v-card-text style="color: #595959"> Dta table title </v-card-text>
    <v-card outlined class="ma-1">
      <v-simple-table max-height="450px">
        <template #default>
          <thead>
            <tr style="background-color: #ff3333">
              <th style="color: #fff" class="text-center">Currency</th>
              <th style="color: #fff" class="text-center">Buy</th>
              <th style="color: #fff" class="text-center">Sell</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in desserts"
              :key="item.Currency"
              :style="{
                backgroundColor:
                  index % 2 == 0 ? 'rgb(230, 255, 230)' : '#ffffff',
              }"
            >
              <td class="text-center">
                {{ item.Currency }}
              </td>
              <td class="text-center">{{ item.Buy }}.00</td>
              <td class="text-center">{{ item.Sell }}.00</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
export default {
  Currency: 'DefaultLayout',
  data() {
    return {
      
      desserts: [
        {
          Currency: 'USD',
          Buy: '20,680',
          Sell: '20.812',
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
      ],
    }
  },
 
}
</script>
  