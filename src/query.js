(function(){
    
    Array.prototype.where = function(predicate){
        return this.filter(predicate);
    };

    Array.prototype.group = function(key){        

        let grouped = this.reduce( (accumulator,val,idx,arr) => {
            if(isPrimitive(val)){ //primitive                
                accumulator[val] = accumulator[val] ? (accumulator[val] + 1) : 1;
            }else{ // object   

                if(!val[key]) throw new Error('key not found');

                if(!accumulator[val[key]]) accumulator[val[key]] = [];
                accumulator[val[key]].push(val);
            }   
            return accumulator;         
        },{});        

        return grouped;
    }

    Array.prototype.select = function(key){
        return this.map((val) => {return val[key]});
    };

    Array.prototype.first = function(){
        return this[0];
    }

    Array.prototype.any = function(condition){
        for(let item of this){
            if(condition(item))
                return true;
        }
        return false;
    }

    Array.prototype.all = function(condition){ 

        if(this.length === 0)
            return false;

        for(let item of this){
            if(!condition(item))
                return false;
        }
        return true;
    }

    Array.prototype.orderBy = function(key){        
        let result = [];

        if(typeof key === 'function' ){
            return this.sort(key);
        }else{            

            if(isPrimitive(this[0])){
                result = this.sort();                
            }else{  
                result = this.sort((a,b) => {
                    if(!a[key] || !b[key])
                        throw new Error('key not found');

                    return a[key] - b[key];
                });
            }
        }
        return result;
    }

    Array.prototype.orderByDesc = function(key){
        let result = this.orderBy(key);
        return result.reverse();
    }

    Array.prototype.take = function(amount){
        if(amount < 0 )
            return this.slice(amount);
            
        return this.slice(0,amount);
    }

    let isPrimitive = function(test){
        return (test !== Object(test));
    }

}())