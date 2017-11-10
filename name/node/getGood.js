let name1 = 14,name2=0,name3=0;
let good = [1,3,5,7,8,11,13,15,16,18,21,23,24,25,31,32,33,35,37,39,41,45,47,48,52,57,61,63,65,67,68,81];
let toselect = new Set()
for(let i of good){
	name3=i-1;
	if(name3<1||name3>30) continue;
	for(let j =1;j<30;j++){
		name2=j;
		let s1 = name1+name2+name3;
		let s2 = name1+name2;
		let s3 = name2+name3;
		if(good.includes(s1)&good.includes(s2)&good.includes(s3)) {
			console.log(`${name2},${name3}`);
			toselect.add(name2);
			toselect.add(name3);
		}
	}
}
console.log(toselect);

/*
output:
9,2
19,2
21,2
23,2
7,4
17,4
19,4
21,4
27,4
1,6
17,6
19,6
25,6
27,6
4,7
11,7
18,7
1,10
11,10
21,10
23,10
9,12
11,12
19,12
21,12
4,14
7,14
9,14
11,14
17,14
19,14
10,15
18,15
1,17
4,17
1,20
11,20
27,20
1,22
9,22
11,22
25,22
2,23
10,23
1,24
7,24
9,24
23,24
1,30
17,30
Set { 9, 2, 19, 21, 23, 7, 4, 17, 27, 1, 6, 25, 11, 18, 10, 12, 14, 15, 20, 22, 24, 30 }
*/