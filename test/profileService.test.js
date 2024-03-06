const mongoose = require('mongoose');

(async () => {
    const { expect } = require('chai'); // Using require for Chai
    const { createNewProfile } = require('../service/profileService'); // Update 'yourFilePath' with the actual file path

    describe('createNewProfile function', () => {
        it('should create a new profile with default type as user', async () => {
            const newProfileJSON = {
                Profile: {
                    userName: 'testuser',
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'testuser@example.com',
                    password: 'password123'
                }
            };

            const newProfile = await createNewProfile(newProfileJSON);

            expect(newProfile.profileId).to.be.an.instanceOf(mongoose.Types.ObjectId);
            expect(newProfile.userName).to.equal('testuser');
            expect(newProfile.firstName).to.equal('Test');
            expect(newProfile.lastName).to.equal('User');
            expect(newProfile.email).to.equal('testuser@example.com');
            expect(newProfile.password).to.equal('password123');
            expect(newProfile.type).to.equal('user');
            expect(newProfile.createdAt).to.be.a('Date');
        });

        it('should create a new profile with type as admin if email is shiramar0401@gmail.com', async () => {
            const newProfileJSON = {
                Profile: {
                    userName: 'adminuser',
                    firstName: 'Admin',
                    lastName: 'User',
                    email: 'shiramar0401@gmail.com',
                    password: 'admin123'
                }
            };

            const newProfile = await createNewProfile(newProfileJSON);

            expect(newProfile.type).to.equal('admin');
        });
    });
})();
