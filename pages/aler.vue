<!-- // if (dataset.label === '(%) of ≤20min' || dataset.label === '(%) of ≤5min') {
    //   // Handle legend item '(%) of ≤20min' and '(%) of ≤5min'
    //   const meta = chartInstance.getDatasetMeta(datasetIndex);
    //   meta.data.forEach((point, index) => {
    //     const data = this.Data[index];
    //     const parts = data.split('|');
    //     let x = point._model.x;
    //     console.log('l', x)
    //     parts.forEach((part, i) => {
    //       console.log('p', part)
    //       // Set color based on part index
    //       ctx.fillStyle = i === 0 ? 'rgb(230, 230, 0)' : '#000';
    //       ctx.font = 'bold 14px Arial';
    //       // Draw text based on condition
    //       if ((dataset.label === '(%) of ≤20min' && i === 0) || (dataset.label === '(%) of ≤5min' && i === 1)) {
    //         ctx.fillText(part, x - 25, point._model.y - 10);
    //         x += ctx.measureText(part).width;
    //       }
    //     });
    //   });
    // } -->