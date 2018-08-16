const should = require('should');
require('../index')

describe('jsavascript query language', function () {

    describe('where function', function () {
        let arr = [1, 2, 3, 4, 5, 6];

        it('should filter array', function () {
            var res = arr.where((curr) => curr % 2 == 0);
            res.should.be.eql([2, 4, 6]);
        })
        it('should keep array untouched', function () {
            var res = arr.where((curr) => curr % 2 == 0);
            arr.should.be.eql([1, 2, 3, 4, 5, 6]);
        })
        it('should return empty array on empty array', function () {
            let res = [].where((curr) => curr % 2 == 0);
            res.should.be.empty();
        })
    });

    describe('group function', function () {

        let objs = [{ id: 0, val: 1 }, { id: 1, val: 2 }, { id: 2, val: 1 }, { id: 3, val: 1 }, { id: 4, val: 2 }, { id: 5, val: 3 }];
        let arr = [1, 2, 2, 3, 3, 3];
        let arr_str = ['one', 'two', 'two', 'three', 'three', 'three'];

        it('should group objects', function () {
            var grouped = objs.group('val');
            grouped.should.have.keys('1', '2', '3');
            grouped['1'].should.length(3);
            grouped['2'].should.length(2);
            grouped['3'].should.length(1);
        });

        it('should group literals and count', function () {
            var grouped = arr.group();
            grouped.should.have.keys('1', '2', '3');
            grouped['1'].should.eql(1);
            grouped['2'].should.eql(2);
            grouped['3'].should.eql(3);
        });

        it('should group string and count', function () {
            var grouped = arr_str.group();
            grouped.should.have.keys('one', 'two', 'three');
            grouped['one'].should.eql(1);
            grouped['two'].should.eql(2);
            grouped['three'].should.eql(3);
        });

        it('should return empty object on an empty array with key', function () {
            var grouped = [].group('no_key');
            grouped.should.be.empty();
        });

        it('should return empty object on an empty array without key', function () {
            var grouped = [].group();
            grouped.should.be.empty();
        });

        it('should throw exception if key not exists on objects array', function () {
            (function () {
                objs.group('notFound');
            }).should.throw('key not found');
        });

        it('should not throw exception if key not exists on primitives array', function () {
            (function () {
                arr.group('notFound');
            }).should.not.throw('key not found');
        });
    });

    describe('select function', function () {

        let arr = [{ id: 1, name: 'amir' }, { id: 2, name: 'daniel' }];

        it('should select the correct field', function () {
            let res = arr.select('name');
            res.should.be.eql(['amir', 'daniel']);
        });

        it('should not change the original array', function () {
            let res = arr.select('name');
            arr.should.be.deepEqual([{ id: 1, name: 'amir' }, { id: 2, name: 'daniel' }]);
        });

        it('should return empty array on empty original array', function () {
            let res = [].select('name');
            res.should.be.empty();
        });
    });

    describe('first function', function () {

        let arr = [{ id: 1, name: 'amir' }, { id: 2, name: 'daniel' }];
        let arr_primitives = [10, 9, 8];

        it('should get the first object', function () {
            let res = arr.first();
            res.should.be.deepEqual({ id: 1, name: 'amir' });
        });

        it('should get the first element', function () {
            let res = arr_primitives.first();
            res.should.be.eql(10);
        });

        it('should return null on empty array', function () {
            let res = [].first();
            should.not.exist(res);
        });

    });

    describe('any function', function () {

        let employees = [{ id: 1, name: 'amir', job: 'developer' }, { id: 2, name: 'daniel', job: 'developer' }, { id: 3, name: 'amit', job: 'product' }];

        it('should return true if at least one element satisfy the condition', function () {
            var anyProduct = employees.any(empl => empl.job === 'product');
            should.ok(anyProduct);
        });

        it('should return false if all elements satisfy the condition', function () {
            var anyProject = employees.any(empl => empl.job === 'project');
            should.ok(!anyProject);
        });
        it('should return false on empty array', function () {
            var firstEmployee = [].any(empl => empl.id === 1);
            should.ok(!firstEmployee);
        });
    });

    describe('all function', function () {
        let employees = [{ id: 1, name: 'amir', job: 'developer' }, { id: 2, name: 'daniel', job: 'developer' }, { id: 3, name: 'amit', job: 'product' }];

        it('should return true if all elements satisfy condition', function () {
            var isAll3FirstEmployees = employees.all(empl => empl.id < 4);
            should.ok(isAll3FirstEmployees);
        });

        it('should return false if at least one element do not satisfy condition', function () {
            var isAllDevelopers = employees.all(empl => empl.job === 'developer');
            should.ok(!isAllDevelopers);
        });

        it('should return false if empty array', function () {
            var isAllDevelopers = [].all(empl => empl.job === 'developer');
            should.ok(!isAllDevelopers);
        });
    });

    describe('orderBy function', function () {

        let primitives = [6, 4, 2, 5, 1, 3];
        let objects = [{ id: 6 }, { id: 4 }, { id: 2 }, { id: 5 }, { id: 1 }, { id: 3 }];

        it('should order privmitives in ascending order', function () {
            let result = primitives.orderBy();
            result.should.eql([1, 2, 3, 4, 5, 6]);
        });

        it('should order primitives in descending order', function () {
            let result = primitives.orderByDesc();
            result.should.eql([6, 5, 4, 3, 2, 1]);
        });

        it('should order objects by key in ascending order', function () {
            let result = objects.orderBy('id');
            result.should.be.deepEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]);
        });

        it('should order objects by key in descending order', function () {
            let result = objects.orderByDesc('id');
            result.should.be.deepEqual([{ id: 6 }, { id: 5 }, { id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }]);
        });

        it('should order objects by function in ascending order', function () {
            let result = objects.orderBy((a, b) => {
                return a.id - b.id;
            });
            result.should.be.deepEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]);
        });

        it('should order objects by function in descending order', function () {
            let result = objects.orderByDesc((a, b) => {
                return a.id - b.id;
            });
            result.should.be.deepEqual([{ id: 6 }, { id: 5 }, { id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }]);
        });

        it('should throw error if object dont have a key', function () {
            (function () {
                objects.orderBy('notFound');
            }).should.throw('key not found');
        });

        it('should not throw error if primitive', function () {
            (function () {
                primitives.orderBy('notFound');
            }).should.not.throw('key not found');
        });

        it('should return empty array if operate on empty array', function () {
            let result = [].orderBy('id');
            result.should.be.empty();
        });
    });

    describe('take function', function () {

        let arr_2 = [{id: 1}, {id:2}];
        let arr_4 = [{id: 1}, {id:2}, {id: 3}, {id: 4}];

        it('should take 3 elements if N=3 and exists 4 elements', function(){
            let result = arr_4.take(3);
            result.should.length(3);
            result[0].should.be.deepEqual({id:1});
            result[1].should.be.deepEqual({id:2});
            result[2].should.be.deepEqual({id:3});
        });

        it('should take 2 elements if N=3 and exists 2 elements', function(){
            let result = arr_2.take(3);
            result.should.length(2);
            result[0].should.be.deepEqual({id:1});
            result[1].should.be.deepEqual({id:2});
        });

        it('should return empty array if N=0', function(){
            let result = arr_2.take(0);
            result.should.length(0);
        });

        it('should return empty array if N=3 and no elements exists', function(){
            let result = [].take(3);
            result.should.length(0);
        });

        it('should take 2 last elements if N=-2 and exists 4 elements', function(){
            let result = arr_4.take(-2);
            result.should.length(2);
            result[0].should.be.deepEqual({id:3});
            result[1].should.be.deepEqual({id:4});
        });

        it('should take 2 last elements if N=-3 and exists 2 elements', function(){
            let result = arr_2.take(-3);
            result.should.length(2);            
        });
    });

    describe('pipe function together', function () {

        let arr = [{ id: 1, name: 'amir' }, { id: 2, name: 'daniel' }, { id: 3, name: 'amit' }];

        it('should filter and select correctly', function () {
            let res = arr.where((obj) => obj.id > 1)
                .select('name');

            res.should.be.eql(['daniel', 'amit']);
        });

        it('should filter select the first', function () {
            let res = arr.where(obj => obj.id > 2)
                        .select('id')
                        .first();

            res.should.be.eql(3);
        });
    });

});


