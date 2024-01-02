<!-- <script>
export default {


    getData() {
        try {
            // Calculate values based on SERVICE_GROUP CLASSIFICATION DATA
            
            const dataObjects = [
                { name: 'DATA', datamin: datamin1, datamax: max, },
            ];
            // Sort the dataObjects array based on the value property in descending order
            // dataObjects.sort((a, b) => b.value - a.value);
            this.names = dataObjects.map(item => item.name);
            this.value = dataObjects.map(item => item.value);
            const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
            this.dataset = this.names.map((item, index) => ({
                name: item,
                value: this.value[index],
                percentage: `${percentages[index]}%`,
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed, e.g., show an error message to the user
            throw error;
        }
    },
    calculateDatamin(data, serviceGroup, threshold) {
        // Assuming "SERVICE_GROUP" is the key you want to filter on
        return data.reduce((sum, entry) => {
            if (entry.SERVICE_GROUP === serviceGroup && entry.TIME_DO_TPLUS <= threshold) {
                // Adjust the logic based on the field you want to sum
                return sum + 1;
            }
            return sum;
        }, 0);
    },
}
</script> -->