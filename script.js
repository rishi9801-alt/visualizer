let arr = [];
let container = document.getElementById("container");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate array
function generateArray() {
  arr = [];
  container.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }

  drawBars();
}

// Draw bars
function drawBars(i = -1, j = -1) {
  container.innerHTML = "";

  for (let k = 0; k < arr.length; k++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = arr[k] * 3 + "px";

    if (k === i || k === j) {
      bar.style.background = "red";
    }

    container.appendChild(bar);
  }
}

// Bubble Sort
function bubbleSort() {
  let i = 0, j = 0;

  let interval = setInterval(() => {
    if (i < arr.length) {
      if (j < arr.length - i - 1) {

        drawBars(j, j + 1);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }

        j++;
      } else {
        j = 0;
        i++;
      }
    } else {
      clearInterval(interval);
      drawBars();
    }
  }, 80);
}

// Selection Sort
function selectionSort() {
  let i = 0, j = 0, min;

  let interval = setInterval(() => {
    if (i < arr.length) {

      if (j === i) min = i;

      if (j < arr.length) {

        if (arr[j] < arr[min]) min = j;

        drawBars(j, min);
        j++;

      } else {
        [arr[i], arr[min]] = [arr[min], arr[i]];
        i++;
        j = i;
      }

    } else {
      clearInterval(interval);
      drawBars();
    }
  }, 80);
}

// Merge Sort
async function mergeSort(start = 0, end = arr.length - 1) {
  if (start >= end) return;

  let mid = Math.floor((start + end) / 2);

  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    await sleep(50);

    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }

    drawBars();
  }

  while (i < left.length) {
    arr[k++] = left[i++];
    drawBars();
  }

  while (j < right.length) {
    arr[k++] = right[j++];
    drawBars();
  }
}

// Buttons
document.getElementById("generate").onclick = generateArray;
document.getElementById("bubble").onclick = bubbleSort;
document.getElementById("selection").onclick = selectionSort;
document.getElementById("merge").onclick = () => mergeSort().then(drawBars);