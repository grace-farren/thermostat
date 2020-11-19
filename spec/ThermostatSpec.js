'use strict';

describe("Thermostat", function() {

    var thermostat;

    beforeEach(function() {
        thermostat = new Thermostat();
    });

    it("starts at 20 degress", function() {
        expect(thermostat.temperature).toEqual(20);
    });

    it('increases in temperature with up()', function(){
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(21);
    });

    it('decreases in temperature with down()', function(){
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(19);
    });
    it('has a minimum of 10 degrees', function(){
      for (var i = 0; i < 11; i++) {
        thermostat.down();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(10);
    });
    it('has power saving mode on by default', function(){
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });
    it('can switch PSM off', function(){
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });
    it('can be switch PSM back on', function(){
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    describe('when power saving mode is on', function (){
      it('has a maximum temperature of 25 degrees', function(){
        for (var i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(25);
      });
    });

    describe('when power saving mode is off', function(){
      it('has a maximum temperature of 32 degrees', function(){
        thermostat.switchPowerSavingModeOff();
        for (var i = 0; i < 13; i++) {
          thermostat.up();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(32);
      });
      it('can be rest to the default temperature', function(){
        for (var i = 0; i < 6; i++) {
          thermostat.up();
        }
        thermostat.resetTemperature();
        expect(thermostat.getCurrentTemperature()).toEqual(20);
      });
    });

    describe('displaying usage levels', function(){
      describe('when the temperature is below 18 degrees', function(){
        it('it is considered low-usage', function(){
          for (var i = 0; i < 3; i++) {
            thermostat.down();
          }
          expect(thermostat.energyUsage()).toEqual('low-usage');
        });
      });
      describe('when the temperature is between 18 and 25 degrees', function(){
        it('it is considered medium-usage', function(){
          expect(thermostat.energyUsage()).toEqual('medium-usage');
        });
      });
      describe('when the temperature is anything else', function(){
        it('it is considered high-usage', function(){
          thermostat.powerSavingMode = false;
          for (var i = 0; i < 6; i++) {
            thermostat.up();
          }
          expect(thermostat.energyUsage()).toEqual('high-usage');
        });
      });
    });
  });


//     it("Should increase the temperature when turned up", function() {
//         thermostat.up();
//         expect(thermostat.temperature).toEqual(21);
//     });
//
//     it("Should decrease the temperature when turned down", function() {
//         thermostat.down();
//         expect(thermostat.temperature).toEqual(19);
//     });
//
//     it("Stops the down function when the temperature is 10 degrees", function() {
//         for(var i = 0; i < 11; i++) {
//             thermostat.down();
//         }
//         expect(thermostat.temperature).toEqual(10);
//     });
//
//     it("Should return true if power saving is on", function() {
//         expect(thermostat.powerSavingMode).toEqual("On");
//     });
//
//     it("Should return 'Off' if power saving is not on", function() {
//         thermostat.switch()
//         expect(thermostat.powerSavingMode).toEqual("Off");
//     });
//
//     it("When power saving mode is on, the up function stops when temperature is 25", function() {
//         for(var i = 0; i < 6; i++) {
//             thermostat.up();
//         }
//         expect(thermostat.temperature).toEqual(25);
//     });
//
//     it("When power saving mode is off, the up function stops when temperature is 32", function() {
//         thermostat.switch();
//         for(var i = 0; i < 13; i++) {
//             thermostat.up();
//         }
//         expect(thermostat.temperature).toEqual(32);
//     });
//
//     it("Resets temperature to 20 when reset function is called", function() {
//         thermostat.up();
//         thermostat.reset();
//         expect(thermostat.temperature).toEqual(20);
//     });
//
// });
//
// describe("Energy usage", function(){
//
//     var thermostat;
//
//     beforeEach(function() {
//         thermostat = new Thermostat();
//     });
//
//     it("Returns 'Low-usage' when temperature is < 18", function() {
//         for(var i = 0; i < 3; i++) {
//             thermostat.down();
//         }
//         expect(thermostat.energyUsage()).toEqual('Low-usage');
//     });
//
//     it("Returns 'Medium-usage' when temperature is <= 25", function() {
//         expect(thermostat.energyUsage()).toEqual('Medium-usage');
//     });
//
//     it("Returns 'High-usage' when temperature is > 25", function() {
//         thermostat.switch();
//         for(var i = 0; i < 13; i++) {
//             thermostat.up();
//         }
//         expect(thermostat.energyUsage()).toEqual('High-usage');
//     });
//
// });
