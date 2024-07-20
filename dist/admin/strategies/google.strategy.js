"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const passport_google_oauth20_1 = require("passport-google-oauth20");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: 'http://localhost:3005/admin/google/callback',
            scope: ['email', 'profile'],
        });
        this.configService = configService;
    }
    validate(accessToken, refreshToken, profile, done) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name, emails, photos } = profile;
            const user = {
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                picture: photos[0].value,
                accessToken,
            };
            done(null, user);
        });
    }
};
GoogleStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map