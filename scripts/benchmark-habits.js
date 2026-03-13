
const getMockHistory = (seed) => {
    return Array.from({ length: 5 }).map((_, i) => ({
        date: `2023-01-${i + 1}`,
        status: ((seed + i) % 3 === 0 ? 'missed' : 'completed'),
    })).reverse();
};

const runBenchmark = (iterations, useMemoMock) => {
    const start = process.hrtime.bigint();

    let habits;
    if (useMemoMock) {
        // Simulation of memoized habits (created once)
        const memoizedHabits = [
            { id: 1, title: 'Drink Water', color: 'bg-cyan-500', history: getMockHistory(1) },
            { id: 2, title: 'Morning Jog', color: 'bg-rose-500', history: getMockHistory(2) },
            { id: 3, title: 'Reading', color: 'bg-amber-500', history: getMockHistory(4) },
        ];
        for (let i = 0; i < iterations; i++) {
            habits = memoizedHabits;
        }
    } else {
        // Simulation of unmemoized habits (created every render)
        for (let i = 0; i < iterations; i++) {
            habits = [
                { id: 1, title: 'Drink Water', color: 'bg-cyan-500', history: getMockHistory(1) },
                { id: 2, title: 'Morning Jog', color: 'bg-rose-500', history: getMockHistory(2) },
                { id: 3, title: 'Reading', color: 'bg-amber-500', history: getMockHistory(4) },
            ];
        }
    }

    const end = process.hrtime.bigint();
    return Number(end - start) / 1000000; // ms
};

const iterations = 100000;
console.log(`Running benchmark with ${iterations} iterations...`);

const baseline = runBenchmark(iterations, false);
console.log(`Baseline (Unmemoized): ${baseline.toFixed(4)} ms`);

const optimized = runBenchmark(iterations, true);
console.log(`Optimized (Memoized): ${optimized.toFixed(4)} ms`);

const improvement = ((baseline - optimized) / baseline * 100).toFixed(2);
console.log(`Improvement: ${improvement}%`);
